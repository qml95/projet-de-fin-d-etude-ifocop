<?php
/**
 * Booster for WooCommerce - Module - Orders
 *
 * @version 3.2.4
 * @author  Algoritmika Ltd.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! class_exists( 'WCJ_Orders' ) ) :

class WCJ_Orders extends WCJ_Module {

	/**
	 * Constructor.
	 *
	 * @version 3.2.4
	 * @todo    Bulk Regenerate Download Permissions - copy "cron" to plugin
	 * @todo    Bulk Regenerate Download Permissions - maybe move "bulk actions" to free
	 * @todo    Bulk Regenerate Download Permissions - maybe as new module
	 */
	function __construct() {

		$this->id         = 'orders';
		$this->short_desc = __( 'Orders', 'woocommerce-jetpack' );
		$this->desc       = __( 'WooCommerce orders auto-complete; admin order currency; bulk regenerate download permissions for orders.', 'woocommerce-jetpack' );
		$this->link_slug  = 'woocommerce-orders';
		parent::__construct();

		if ( $this->is_enabled() ) {

			// Order auto complete
			if ( 'yes' === get_option( 'wcj_order_auto_complete_enabled', 'no' ) ) {
				add_action( 'woocommerce_thankyou',         array( $this, 'auto_complete_order' ), PHP_INT_MAX );
				add_action( 'woocommerce_payment_complete', array( $this, 'auto_complete_order' ), PHP_INT_MAX );
			}

			// Order currency
			if ( 'yes' === get_option( 'wcj_order_admin_currency', 'no' ) ) {
				$this->meta_box_screen = 'shop_order';
				add_action( 'add_meta_boxes',       array( $this, 'add_meta_box' ) );
				add_action( 'save_post_shop_order', array( $this, 'save_meta_box' ), PHP_INT_MAX, 2 );
				if ( 'filter' === get_option( 'wcj_order_admin_currency_method', 'filter' ) ) {
					$woocommerce_get_order_currency_filter = ( WCJ_IS_WC_VERSION_BELOW_3 ? 'woocommerce_get_order_currency' : 'woocommerce_order_get_currency' );
					add_filter( $woocommerce_get_order_currency_filter, array( $this, 'change_order_currency' ), PHP_INT_MAX, 2 );
				}
			}

			// Bulk Regenerate Download Permissions
			if ( 'yes' === apply_filters( 'booster_get_option', 'no', get_option( 'wcj_order_bulk_regenerate_download_permissions_enabled', 'no' ) ) ) {
				// Actions
				if ( 'yes' === get_option( 'wcj_order_bulk_regenerate_download_permissions_actions', 'no' ) ) {
					add_filter( 'bulk_actions-edit-shop_order',        array( $this, 'register_bulk_actions_regenerate_download_permissions' ), PHP_INT_MAX );
					add_filter( 'handle_bulk_actions-edit-shop_order', array( $this, 'handle_bulk_actions_regenerate_download_permissions' ), 10, 3 );
				}
				// All orders
				add_action( 'woojetpack_after_settings_save', array( $this, 'maybe_bulk_regenerate_download_permissions_all_orders' ) );
				// Admin notices
				add_filter( 'admin_notices', array( $this, 'admin_notice_regenerate_download_permissions' ) );
				// All orders - Cron
				if ( 'disabled' != apply_filters( 'booster_get_option', 'disabled', get_option( 'wcj_order_bulk_regenerate_download_permissions_all_orders_cron', 'disabled' ) ) ) {
					add_action( 'init',       array( $this, 'schedule_bulk_regenerate_download_permissions_all_orders_cron' ) );
					add_action( 'admin_init', array( $this, 'schedule_bulk_regenerate_download_permissions_all_orders_cron' ) );
					add_filter( 'cron_schedules', 'wcj_crons_add_custom_intervals' );
					add_action( 'wcj_bulk_regenerate_download_permissions_all_orders_cron', array( $this, 'bulk_regenerate_download_permissions_all_orders' ) );
				}
			}

		}
	}

	/**
	 * schedule_bulk_regenerate_download_permissions_all_orders_cron.
	 *
	 * @version 3.2.4
	 * @since   3.2.4
	 */
	function schedule_bulk_regenerate_download_permissions_all_orders_cron() {
		wcj_crons_schedule_the_events(
			'wcj_bulk_regenerate_download_permissions_all_orders_cron',
			apply_filters( 'booster_get_option', 'disabled', get_option( 'wcj_order_bulk_regenerate_download_permissions_all_orders_cron', 'disabled' ) )
		);
	}

	/**
	 * handle_bulk_actions_regenerate_download_permissions.
	 *
	 * @version 3.2.0
	 * @since   3.2.0
	 * @see     https://make.wordpress.org/core/2016/10/04/custom-bulk-actions/
	 * @todo    (maybe) "bulk actions" for for WP < 4.7
	 */
	function handle_bulk_actions_regenerate_download_permissions( $redirect_to, $doaction, $post_ids ) {
		if ( $doaction !== 'wcj_regenerate_download_permissions' ) {
			return $redirect_to;
		}
		$data_store = WC_Data_Store::load( 'customer-download' );
		foreach ( $post_ids as $post_id ) {
			$data_store->delete_by_order_id( $post_id );
			wc_downloadable_product_permissions( $post_id, true );
		}
		$redirect_to = add_query_arg( 'wcj_bulk_regenerated_download_permissions', count( $post_ids ), $redirect_to );
		return $redirect_to;
	}

	/**
	 * register_bulk_actions_regenerate_download_permissions.
	 *
	 * @version 3.2.0
	 * @since   3.2.0
	 */
	function register_bulk_actions_regenerate_download_permissions( $bulk_actions ) {
		$bulk_actions['wcj_regenerate_download_permissions'] = __( 'Regenerate download permissions', 'woocommerce-jetpack' );
		return $bulk_actions;
	}

	/**
	 * admin_notice_regenerate_download_permissions.
	 *
	 * @version 3.2.0
	 * @since   3.2.0
	 */
	function admin_notice_regenerate_download_permissions() {
		if ( ! empty( $_REQUEST['wcj_bulk_regenerated_download_permissions'] ) ) {
			$orders_count = intval( $_REQUEST['wcj_bulk_regenerated_download_permissions'] );
			$message = sprintf(
				_n( 'Download permissions regenerated for %s order.', 'Download permissions regenerated for %s orders.', $orders_count, 'woocommerce-jetpack' ),
				'<strong>' . $orders_count . '</strong>'
			);
			echo '<div class="notice notice-success is-dismissible"><p>' . $message . '</p></div>';
		}
	}

	/**
	 * bulk_regenerate_download_permissions_all_orders.
	 *
	 * @version 3.2.0
	 * @since   3.2.0
	 */
	function bulk_regenerate_download_permissions_all_orders() {
		$data_store   = WC_Data_Store::load( 'customer-download' );
		$block_size   = 512;
		$offset       = 0;
		$total_orders = 0;
		while( true ) {
			$args = array(
				'post_type'      => 'shop_order',
				'post_status'    => 'any',
				'posts_per_page' => $block_size,
				'offset'         => $offset,
				'orderby'        => 'ID',
				'order'          => 'DESC',
				'fields'         => 'ids',
			);
			$loop = new WP_Query( $args );
			if ( ! $loop->have_posts() ) {
				break;
			}
			foreach ( $loop->posts as $post_id ) {
				$data_store->delete_by_order_id( $post_id );
				wc_downloadable_product_permissions( $post_id, true );
				$total_orders++;
			}
			$offset += $block_size;
		}
		return $total_orders;
	}

	/**
	 * maybe_bulk_regenerate_download_permissions_all_orders.
	 *
	 * @version 3.2.0
	 * @since   3.2.0
	 */
	function maybe_bulk_regenerate_download_permissions_all_orders() {
		if ( 'yes' === get_option( 'wcj_order_bulk_regenerate_download_permissions_all_orders', 'no' ) ) {
			update_option( 'wcj_order_bulk_regenerate_download_permissions_all_orders', 'no' );
			$total_orders = $this->bulk_regenerate_download_permissions_all_orders();
			wp_safe_redirect( add_query_arg( 'wcj_bulk_regenerated_download_permissions', $total_orders ) );
			exit;
		}
	}

	/**
	 * change_order_currency.
	 *
	 * @version 2.7.0
	 * @since   2.5.6
	 */
	function change_order_currency( $order_currency, $_order ) {
		return ( '' != ( $wcj_order_currency = get_post_meta( wcj_get_order_id( $_order ), '_' . 'wcj_order_currency', true ) ) ) ? $wcj_order_currency : $order_currency;
	}

	/**
	* Auto Complete all WooCommerce orders.
	*
	* @version 2.7.0
	*/
	function auto_complete_order( $order_id ) {
		if ( ! $order_id ) {
			return;
		}
		$order = wc_get_order( $order_id );
		$order->update_status( 'completed' );
	}

}

endif;

return new WCJ_Orders();
