/**
 * BLOCK: kenzap-feature-v2-3
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import Edit from './edit';
import { blockProps, ContainerSave } from '../commonComponents/container/container';

/**
 * Provides the initial data for new block
 * @type {{title: string, icon: string, iconMediaId: string, iconMediaUrl: string, description: string}}
 */
export const defaultItem = {
    title: __( 'New feature', 'kenzap-features' ),
    iconMediaId: '',
    iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-3/img/featured-1.png',
    description: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus leo sit amet.', 'kenzap-features' ),
};

export const defaultSubBlocks = JSON.stringify( [
    { ...defaultItem, title: __( 'PURE DRINK', 'kenzap-features' ), key: 'default1', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-3/img/featured-1.png' },
    { ...defaultItem, title: __( 'PURE AIR', 'kenzap-features' ), key: 'default2', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-3/img/featured-2.png' },
    { ...defaultItem, title: __( 'EXQUISITE SPACE', 'kenzap-features' ), key: 'default3', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-3/img/featured-3.png' },
    { ...defaultItem, title: __( 'HANDY MATERIAL', 'kenzap-features' ), key: 'default4', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-3/img/featured-4.png' },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const featuredImg = {
        height: `${ attributes.iconSize }px`,
        width: `${ attributes.iconSize }px`,
    };

    const vars = {
        '--h3': `${ attributes.titleSize }px`,
        '--h3v': `${ attributes.titleSize }`,
        '--h3lh': `${ attributes.titleSize * 1.4 }px`,
        '--p': `${ attributes.descriptionSize }px`,
        '--pv': `${ attributes.descriptionSize }`,
        '--plh': `${ attributes.descriptionSize * 1.7 }px`,
    };

    const kenzapContanerStyles = {};

    if ( attributes.width100 ) {
        kenzapContanerStyles.width = '100%';
        kenzapContanerStyles[ '--maxWidth' ] = '2000';
    } else {
        kenzapContanerStyles.maxWidth = `${ attributes.containerMaxWidth }px`;
        kenzapContanerStyles[ '--maxWidth' ] = `${ attributes.containerMaxWidth } `;
    }

    let additionalClassForKenzapContainer = 'kenzap-lg';
    
    if ( attributes.containerMaxWidth < 992 ) {
        additionalClassForKenzapContainer = 'kenzap-md';
    }

    if ( attributes.containerMaxWidth < 768 ) {
        additionalClassForKenzapContainer = 'kenzap-sm';
    }

    if ( attributes.containerMaxWidth < 480 ) {
        additionalClassForKenzapContainer = 'kenzap-xs';
    }

    if ( attributes.width100 ) {
        additionalClassForKenzapContainer = 'kenzap-lg';
    }

    return {
        featuredImg,
        vars,
        kenzapContanerStyles,
        additionalClassForKenzapContainer,
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
registerBlockType( 'kenzap/feature-list-3', {
    title: __( 'Kenzap Feature List 3', 'kenzap-features' ),
    icon: 'yes',
    category: 'layout',
    keywords: [
        __( 'feature', 'kenzap-features' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,

        iconSize: {
            type: 'number',
            default: 80,
        },

        titleSize: {
            type: 'number',
            default: 18,
        },

        descriptionSize: {
            type: 'number',
            default: 15,
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
            vars,
            kenzapContanerStyles,
            additionalClassForKenzapContainer,
        } = getStyles( attributes );

        return (
            <div className={ `kenzap ${ className ? className : '' }` }>
                <ContainerSave
                    className={ `kenzap-featured-list-3 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                >
                    <div className={ `kenzap-container ${ additionalClassForKenzapContainer }` } style={ kenzapContanerStyles }>
                        <div className="kenzap-row">
                            { attributes.items && attributes.items.map( item => (
                                <div
                                    key={ item.key }
                                    className="kenzap-col-3"
                                >
                                    <div className="featured-box">
                                        <img
                                            src={ item.iconMediaUrl }
                                            alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                            style={ featuredImg }
                                        />
                                        <RichText.Content
                                            tagName="h3"
                                            value={ item.title }
                                        />
                                        <RichText.Content
                                            tagName="p"
                                            value={ item.description }
                                        />
                                    </div>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
