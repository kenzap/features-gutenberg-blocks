<?php
/*
Plugin Name: Kenzap Features
Description: Easily create and customize features blocks on your website
Author: Kenzap
Version: 1.2.0
Author URI: http://kenzap.com
License: GPL2+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: kenzap-features
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("KENZAP_FEATURES", __DIR__);

//Check plugin requirements
if ( version_compare(PHP_VERSION, '5.6', '<') || !function_exists('register_block_type') ) {
    if (! function_exists('kenzap_features_disable_plugin')) {
        /**
         * Disable plugin
         *
         * @return void
         */
        function kenzap_features_disable_plugin(){

            if (current_user_can('activate_plugins') && is_plugin_active(plugin_basename(__FILE__))) {
                deactivate_plugins(__FILE__);
                unset($_GET['activate']);
            }
        }
    }

    if (! function_exists('kenzap_features_show_error')) {
        /**
         * Show error
         *
         * @return void
         */
        function kenzap_features_show_error(){

            echo '<div class="error"><p><strong>Kenzap Features</strong> needs at least PHP 5.6 version and WordPress 5.0, please update before installing the plugin.</p></div>';
        }
	}
	
    //Add actions
    add_action('admin_init', 'kenzap_features_disable_plugin');
    add_action('admin_notices', 'kenzap_features_show_error');

    //Do not load anything more
    return;
}

/**
 * Add Localization support
 */
function kenzap_features_load_textdomain() {

    $locale = is_admin() && function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
    $locale = apply_filters( 'plugin_locale', $locale, 'kenzap-features' );

    unload_textdomain( 'kenzap-features' );
    load_textdomain( 'kenzap-features', __DIR__ . '/languages/kenzap-features-' . $locale . '.mo' );
    load_plugin_textdomain( 'kenzap-features', false, __DIR__ . '/languages' );
}
add_action( 'init', 'kenzap_features_load_textdomain' );

//Load body class
function kenzap_features_body_class( $classes ) {

	if ( is_array($classes) ){ $classes[] = 'kenzap'; }else{ $classes.=' kenzap'; }
	return $classes;
}
add_filter( 'body_class', 'kenzap_features_body_class' );
add_filter( 'admin_body_class', 'kenzap_features_body_class' );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
