<?php
get_header();

?>

<div class="container woocommerce">
	<section id="main" class="row">
		<div class="content_background">

			<div id="content">

				<h1>Les promotions</h1>

				<ul class="products">
					<?php

						$args = array(
							'post_type'      => 'product',
							'posts_per_page' => 10,
							'meta_query'     => array(
								'relation' => 'OR',
								array(   // produits simples
									'key'    => '_sale_price',
									'value'  => 0,
									'compare'=> '>',
									'type'   => 'numeric'
								),
								array(   // produits variables
									'key'    => '_min_variation_sale_price',
									'value'  => 0,
									'compare'=> '>',
									'type'   => 'numeric'
								),
							),
						);


						query_posts($args);

						while(have_posts()) : the_post();
							get_template_part('woocommerce/content', 'product');
						endwhile;
					?>
				</ul>



			</div><!-- #content -->

		</div><!-- .content_background -->
	</section>

</div>


<?php
get_footer();  
?>
