/**
 * BLOCK: kenzap-feature-1
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import Edit from './edit';

/**
 * Provides the initial data for new block
 * @type {{title: string, icon: string, iconMediaId: string, iconMediaUrl: string, description: string}}
 */
export const defaultItem = {
    title: __( 'New feature' ),
    iconMediaId: '',
    iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-1/img/featured-1.svg',
    description: '' +
    '<li>' + __( 'FULLY CUSTOMIZABLE', 'kenzap-features' ) + '</li>' +
    '<li>' + __( 'POWERFUL THEME OPTIONS', 'kenzap-features' ) + '</li>' +
    '<li>' + __( 'VISUAL COMPOSER', 'kenzap-features' ) + '</li>' +
    '<li>' + __( 'ELITE ADDONS', 'kenzap-features' ) + '</li>' +
    '<li>' + __( 'SLIDER REVOLUTION', 'kenzap-features' ) + '</li>' +
    '<li>' + __( 'FRIENDLY SUPPORT', 'kenzap-features' ) + '</li>',
};

export const defaultSubBlocks = JSON.stringify( [
    { ...defaultItem, title: __( 'EASY-TO-USE', 'kenzap-features' ), key: 'default1', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-1/img/featured-1.svg' },
    { ...defaultItem, title: __( 'WOOCOMMERCE', 'kenzap-features' ), key: 'default2', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-1/img/featured-2.svg' },
    { ...defaultItem, title: __( 'SUPPORT', 'kenzap-features' ), key: 'default3', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-1/img/featured-3.svg' },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const featuredImg = {
        height: `${ attributes.iconSize }px`,
    };

    const title = {
        fontSize: `${ attributes.titleSize }px`,
        lineHeight: `${ attributes.titleSize * 1.4 }px`,
    };

    const description = {
        fontSize: `${ attributes.descriptionSize }px`,
        lineHeight: `${ attributes.descriptionSize * 1.4 }px`,
    };

    const container = {
        '--tcolor': attributes.titleColor,
        '--thover': attributes.titleColorOnHover,
        '--dcolor': attributes.descriptionColor,
        '--dhover': attributes.descriptionColorOnHover,
        '--backgroundHover': attributes.backgroundColorOnHover,
    };

    return {
        featuredImg,
        title,
        description,
        container,
    };
};

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kenzap/feature-list-1', {
    title: __( 'Kenzap Feature List 1', 'kenzap-features' ),
    icon: 'yes',
    category: 'layout',
    keywords: [
        __( 'feature', 'kenzap-features' ),
        __( 'avantages', 'kenzap-features' ),
        __( 'avantages', 'kenzap-features' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        iconSize: {
            type: 'number',
            default: 40,
        },

        titleSize: {
            type: 'number',
            default: 32,
        },

        titleColor: {
            type: 'string',
            default: '#111',
        },

        descriptionSize: {
            type: 'number',
            default: 11,
        },

        descriptionColor: {
            type: 'string',
            default: '#555',
        },

        isHoverEnabled: {
            type: 'bool',
            default: true,
        },

        backgroundColorOnHover: {
            type: 'string',
            default: '#1c1c1c',
        },

        titleColorOnHover: {
            type: 'string',
            default: '#fff',
        },

        descriptionColorOnHover: {
            type: 'string',
            default: '#fff',
        },

        items: {
            type: 'array',
            default: [],
        },

        isFirstLoad: {
            type: 'boolean',
            default: true,
        },

        blockUniqId: {
            type: 'number',
            default: 0,
        },
    },

    edit: ( props ) => {
        if ( props.attributes.items.length === 0 && props.attributes.isFirstLoad ) {
            props.setAttributes( {
                items: [ ...JSON.parse( defaultSubBlocks ) ],
                isFirstLoad: false,
            } );
            // TODO It is very bad solution to avoid low speed working of setAttributes function
            props.attributes.items = JSON.parse( defaultSubBlocks );

            if ( ! props.attributes.blockUniqId ) {
                props.setAttributes( {
                    blockUniqId: new Date().getTime(),
                } );
            }
        }

        return ( <Edit { ...props } /> );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     * @param {Object} props - attributes
     * @returns {Node} rendered component
     */
    save: function( props ) {
        const {
            className,
            attributes,
        } = props;

        const {
            featuredImg,
            title,
            description,
            container,
        } = getStyles( attributes );

        return (
            <div
                className={ `kenzap-featured-list-1 ${ attributes.isHoverEnabled ? 'hover-enabled' : '' } ${ className ? className : '' }` }
                style={ container }
            >
                { attributes.items && attributes.items.map( item => (
                    <div
                        key={ item.key }
                        className="featured-box"
                    >
                        <div className="featured-img">
                            { item.iconMediaUrl &&
                                <img
                                    src={ item.iconMediaUrl }
                                    alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                    style={ featuredImg }
                                />
                            }

                        </div>
                        <RichText.Content
                            tagName="h3"
                            value={ item.title }
                            style={ title }
                        />
                        <RichText.Content
                            tagName="ul"
                            value={ item.description }
                            style={ description }
                        />
                    </div>
                ) ) }
            </div>
        );
    },
} );
