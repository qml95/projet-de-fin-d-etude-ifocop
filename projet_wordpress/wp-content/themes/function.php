<?php
// Zones de widgets
add_action('widgets_init', 'woocommerce_init_sidebar');  // j'exécute la fonction nommé "woocommerce_init_sidebar" lors de l'initialisation des widgets

function woocommerce_init_sidebar() {

	register_sidebar(array(    // crée une zone de widgets
		'name'       => 'Région haut de la page détail du produit', // nom qui apparaît dans le back-office
		'id'         => 'region-haut-produit', // son id
		'description'=> 'Widgets qui apparaissent dans la région haute de la page produit', // description qui apparaît dans le back-office
	));

	register_sidebar(array(    // crée une zone de widgets
		'name'       => 'Région haut de la boutique',
		'id'         => 'region-haut-boutique',
		'description'=> 'Widgets qui apparaissent dans la région haute de la boutique',
	));

	register_sidebar(array(    // crée une zone de widgets
		'name'       => 'Région bas de la boutique',
		'id'         => 'region-bas-boutique',
		'description'=> 'Widgets qui apparaissent dans la région basse de la boutique',
	));
}
