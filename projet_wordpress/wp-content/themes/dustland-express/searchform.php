<?php
/**
 * The template for displaying search forms in Dustland Express
 *
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label>
		<input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search&hellip;', 'placeholder', 'dustland-express' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" title="<?php _ex( 'Search for:', 'label', 'dustland-express' ); ?>" />
	</label>
	<input type="submit" class="search-submit" value="<?php echo esc_attr_x( '&nbsp;', 'submit button', 'dustland-express' ); ?>" />
</form>