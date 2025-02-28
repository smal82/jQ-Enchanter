<?php
/**
 * Plugin Name: jQ Enchanter
 * Plugin URI: https://salvatoremaltese.it/
 * Description: Attiva effetti jQuery con switch On/Off dal pannello di amministrazione.
 * Version: 1.0.4
 * Author: smalnet
 * Author URI: https://profiles.wordpress.org/smalnet/
 * License: GPLv2+
 */

if (!defined('ABSPATH')) {
    exit; // Blocca accesso diretto
}

// Aggiungi il link "Impostazioni" nella pagina dei plugin
function jqench_add_settings_link($links) {
    $settings_link = '<a href="admin.php?page=jq-enchanter">Impostazioni</a>';
    array_unshift($links, $settings_link);
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'jqench_add_settings_link');

function jqench_plugin_meta_links($links, $file) {
    if ($file === plugin_basename(__FILE__)) {
        $links[] = '<a href="https://salvatoremaltese.it" target="_blank" style="font-weight: bold;">Visita il sito</a>';
    }
    return $links;
}
add_filter('plugin_row_meta', 'jqench_plugin_meta_links', 10, 2);


// Crea il menu nel backend di WordPress
function jqench_add_admin_menu() {
    add_menu_page(
        'jQ Enchanter',
        'jQ Enchanter',
        'manage_options',
        'jq-enchanter',
        'jqench_settings_page',
		 plugins_url('assets/icon.png', __FILE__)
    );
}
add_action('admin_menu', 'jqench_add_admin_menu');

// Salva le impostazioni degli switch
function jqench_save_settings() {
	if (isset($_POST['jqench_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['jqench_nonce'])), 'jqench_save_settings')) {
        // Imposta tutti gli effetti su 0 di default
        $settings = [
            'neve' => 0,
			'background-changer' => 0,
			'santa' => 0,
			'befana' => 0,
			'karaoke' => 0,
			'love' => 0
        ];

        // Sovrascrive solo quelli attivati
        if (isset($_POST['jqench_settings']) && is_array($_POST['jqench_settings'])) {
			$settings = array_map('sanitize_text_field', wp_unslash($_POST['jqench_settings'])); // Rimuove gli slash prima della sanitizzazione

            foreach ($settings as $key => $value) {
				$key = sanitize_key($key); // Per le chiavi (nomi degli effetti)
				$value = sanitize_text_field($value); // Per i valori (ON/OFF)
                if (array_key_exists($key, $settings)) {
                    $settings[$key] = 1;
                }
            }
        }

        update_option('jqench_settings', $settings);
		
		// Reindirizza per evitare problemi di refresh
    //wp_redirect(admin_url('admin.php?page=jq-enchanter&status=saved'));
	$redirectjqench = admin_url('admin.php?page=jq-enchanter&status=saved');
	wp_safe_redirect($redirectjqench);
    exit;
    }
}
add_action('admin_post_jqench_save_settings', 'jqench_save_settings');


function jqench_enqueue_admin_styles($hook) {
    // Ottiene il percorso dell'immagine
    $jqench_logo_url = plugin_dir_url(__FILE__) . 'assets/logo.png';

    // Registra ed enqueua il CSS
    wp_register_style('jqench-admin-style', false, [], get_bloginfo('version'));
    wp_enqueue_style('jqench-admin-style');

    // Aggiunge il CSS inline con l'immagine di sfondo
    $jqench_logo_css = "
        .jqench-logo {
            width: 100px;
            height: 100px;
            background-image: url('" . esc_url($jqench_logo_url) . "');
            background-size: contain;
            background-repeat: no-repeat;
            display: block;
        }
    ";
    wp_add_inline_style('jqench-admin-style', $jqench_logo_css);
}
add_action('admin_enqueue_scripts', 'jqench_enqueue_admin_styles');


// Pagina impostazioni con gli switch On/Off
function jqench_settings_page() {
    $settings = get_option('jqench_settings', []);
    $effects = [
	'neve' => 'Neve',
	'background-changer' => 'Background changer',
	'santa' => 'Babbo Natale',
	'befana' => 'Befana',
	'karaoke' => 'Karaoke',
	'love' => 'San Valentino'
	];
    ?>
    <div class="wrap">
	<div class="jqench-logo"></div>
        <h1>Impostazioni</h1>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <?php wp_nonce_field('jqench_save_settings', 'jqench_nonce'); ?>
            <input type="hidden" name="action" value="jqench_save_settings">
            
            <table class="form-table">
                <?php foreach ($effects as $key => $label) : ?>
                    <tr>
                        <th><?php echo esc_html($label); ?></th>
                        <td>
                            <label class="jqench-switch">
                                <input type="checkbox" name="jqench_settings[<?php echo esc_attr($key); ?>]" value="1"
                                    <?php checked(isset($settings[$key]) && $settings[$key] == 1); ?>>
                                <span class="jqench-slider"></span>
                            </label>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>

            <p><input type="submit" class="button button-primary" value="Salva Impostazioni"></p>
        </form>
    </div>

   
    <?php
}

function jqench_add_inline_styles() {
	// Ottiene la versione di WordPress
    $wp_version = get_bloginfo('version');
    // Enqueue uno stile base (anche se vuoto) per permettere l'aggiunta di CSS inline
    wp_register_style('jqench-inline-style', false, [], $wp_version);
    wp_enqueue_style('jqench-inline-style');

    // CSS inline da aggiungere
    $jqench_css = "
        .jqench-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 25px;
        }
        .jqench-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .jqench-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 25px;
        }
        .jqench-slider:before {
            position: absolute;
            content: '';
            height: 17px;
            width: 17px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .jqench-slider {
            background-color: #2196F3;
        }
        input:checked + .jqench-slider:before {
            transform: translateX(25px);
        }
    ";

    // Aggiunge il CSS inline
    wp_add_inline_style('jqench-inline-style', $jqench_css);
}
add_action('admin_enqueue_scripts', 'jqench_add_inline_styles');

function jqench_enqueue_scripts() {
	
	// Ottiene la versione di WordPress
    $wp_version = get_bloginfo('version');
	
	$settings = get_option('jqench_settings', []);

    foreach ($settings as $effect => $enabled) {
        if ($enabled) {
            wp_enqueue_script($effect . '-script', plugin_dir_url(__FILE__) . "effects/$effect/$effect.js", ['jquery'], get_bloginfo('version'), true);
			if ($effect === "background-changer") {
			wp_localize_script($effect . '-script', 'jqenchData', array(
        'imagesPath' => plugin_dir_url(__FILE__) . 'effects/background-changer/assets/'
    ));
			}
			if ($effect === "karaoke") {
				wp_enqueue_style(
        'rock-salt-font',
        'https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap',
        [],
        $wp_version
			);
add_action('wp_enqueue_scripts', 'karaoke_enqueue_styles');
			}
            wp_enqueue_style($effect . '-style', plugin_dir_url(__FILE__) . "effects/$effect/$effect.css", [], get_bloginfo('version'));
        }
    }
}

add_action('wp_enqueue_scripts', 'jqench_enqueue_scripts');

// Carica il file HTML (se esiste) nel footer
function jqench_load_html() {
    $settings = get_option('jqench_settings', []);

    foreach ($settings as $effect => $enabled) {
        if ($enabled && file_exists(plugin_dir_path(__FILE__) . "effects/$effect/$effect.php")) {
            include plugin_dir_path(__FILE__) . "effects/$effect/$effect.php";
        }
    }
}
add_action('wp_footer', 'jqench_load_html');

// Pulisce le impostazioni quando il plugin viene disattivato
// Funzione per eliminare le immagini alla disattivazione del plugin
function jqench_cleanup() {
    delete_option('jqench_settings');
}

register_deactivation_hook(__FILE__, 'jqench_cleanup');