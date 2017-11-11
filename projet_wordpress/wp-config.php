<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'infor-matique');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', 'root');

/** Adresse de l’hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'sD#trREI<_~xD[}g)xM+zzgQ)*kCxiqf~00OX5Nk^^FmgVAU:DqB;_7G/V#1^Vt/');
define('SECURE_AUTH_KEY',  '!A..F6#~PpwYN0PB1y_pI^wF/^bf_j`tyad32^v;(J_j&rsr;mIzm;?{X h42izE');
define('LOGGED_IN_KEY',    'MZjyX1+0G*I>J1gtAc$z@VJM{Py%xY|`0p~Zic@I*P^=w=71+oJO9b+Y+TgS;8Y~');
define('NONCE_KEY',        'bUBu&i^e$wddk&nJFLSjvb*W_?aySTNS/o1w&6i$C3NmMNor~c:8nBWppVA}mo%O');
define('AUTH_SALT',        'Ip^q{2xiM@)JZkr 3`K$?F9c!Fb72:auj>t=J,&5`>5TA^WB=OsKYw9^Zp%7{2<&');
define('SECURE_AUTH_SALT', '#>t+i28--eHz8#=<!,>[#6JCK(p9V$HY4>$NUd6 HvLUK42Y3^P O3Hct!L]!7m!');
define('LOGGED_IN_SALT',   '$*y3!9*pYNPsY&v<So~Ar`>n8^E`&G4M,ae,fd?tRuzpM~zo~V4%.nift0TYO%%!');
define('NONCE_SALT',       'yc7} 4<@TZBUw!]!hoOW~p<Xn}B_!Ce1ix(p$d<:V>fPT,]6`g_|Ocpd?`wU>|@n');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix  = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');