<?php
/*
Template name: Boutique
 */

get_header();


    <section id="primary" class="content-area col-sm-12 col-md-12 col-lg-8">
        <main id="main" class="site-main" role="main">

            <?php woocommerce_content(); ?>

        </main><!-- #main -->
    </section><!-- #primary -->

<?php

get_footer();
