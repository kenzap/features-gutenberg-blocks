<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function kenzap_feature_list_block_assets() {
	
	// Styles.
	wp_enqueue_style(
		'kenzap-feature-list-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor', 'owl-carousel' )
	);

    // Include owl carousel script
	wp_enqueue_script(
		'owl-carousel', 
		plugins_url( 'dist/assets/owl.carousel.min.js', dirname( __FILE__ ) ),
		array( 'jquery')
	);

	//Include owl carousel styles
	wp_enqueue_style(
		'owl-carousel', 
		plugins_url( 'dist/assets/owl.carousel.min.css', dirname( __FILE__ ) )
	);
	
    // Init owl
    wp_enqueue_script(
        'feature-list-2', 
        plugins_url( 'feature-list-2/script.js', __FILE__ ), array('owl-carousel') 
    );

} // End function kenzap_feature_list_cgb_block_assets().


// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'kenzap_feature_list_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function kenzap_feature_list_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'kenzap-features-editor', // Handle.
		plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ), // Dependencies, defined above.
        // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'kenzap-features-editor', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);

	// This is only available in WP5.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'kenzap-features-editor', 'kenzap-features', KENZAP_FEATURES . '/languages/' );
	}

	$pathToPlugin = plugins_url( 'dist/', dirname( __FILE__ ) );
    wp_add_inline_script( 'wp-blocks', 'var kenzap_features_gutenberg_path = "' .wp_parse_url($pathToPlugin)['path'].'"', 'before');
} // End function kenzap_feature_list_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'kenzap_feature_list_editor_assets' );
