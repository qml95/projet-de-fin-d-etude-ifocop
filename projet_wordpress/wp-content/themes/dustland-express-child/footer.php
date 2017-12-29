<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Dustland Express
 */
?>
</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">

	<div class="site-footer-widgets">
        <div class="site-container">
        	<?php if ( is_active_sidebar( 'dustlandexpress-site-footer' ) ) : ?>
            <ul>
                <?php dynamic_sidebar( 'dustlandexpress-site-footer' ); ?>
            </ul>
            <?php else : ?>
	        	<div class="site-footer-no-widgets">
	        		<?php _e( 'Add your own widgets here', 'dustland-express' ); ?>
	        	</div>
	    	<?php endif; ?>
            <div class="clearboth"></div>
        </div>
    </div>
	        </div>

	    </div>

        <div class="clearboth"></div>
	</div>

</footer> <!-- .site-footer -->
</div> <!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
