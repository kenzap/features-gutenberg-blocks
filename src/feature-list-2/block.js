/**
 * BLOCK: kenzap-feature-2
 *
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import { blockProps, ContainerSave } from '../commonComponents/container/container';
import Edit from './edit';

/**
 * Provides the initial data for new block
 * @type {{title: string, icon: string, iconMediaId: string, iconMediaUrl: string, description: string}}
 */
export const defaultItem = {
    title: __( 'New feature', 'kenzap-features' ),
    iconMediaId: '',
    iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-2/img/featured-1.svg',
    description: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper lacus at massa ultricies auctor. Integer sodales commodo', 'kenzap-features' ),
};

export const defaultSubBlocks = JSON.stringify( [
    { ...defaultItem, title: __( 'New Feature 1', 'kenzap-features' ), key: 'default1', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-2/img/featured-1.svg' },
    { ...defaultItem, title: __( 'New Feature 2', 'kenzap-features' ), key: 'default2', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-2/img/featured-2.svg' },
    { ...defaultItem, title: __( 'New Feature 3', 'kenzap-features' ), key: 'default3', iconMediaUrl: window.kenzap_features_gutenberg_path + 'feature-list-2/img/featured-3.svg' },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {

    const varsTop = {
        '--paddings': `${ attributes.containerPadding }`,
        '--paddingsMin': `${ attributes.containerPadding/4 }`,
        '--paddingsMinPx': `${ attributes.containerPadding/4 }px`,
    };

    const vars = {
        '--h2': `${ attributes.mainTitleSize }px`,
        '--h2v': `${ attributes.mainTitleSize }`,
        '--h2lh': `${ attributes.mainTitleSize * 1.2 }px`,
        '--h3': `${ attributes.titleSize }px`,
        '--h3v': `${ attributes.titleSize }`,
        '--h3lh': `${ attributes.titleSize * 1.4 }px`,
        '--p': `${ attributes.descriptionSize }px`,
        '--pv': `${ attributes.descriptionSize }`,
        '--plh': `${ attributes.descriptionSize * 1.4 }px`,
        '--paddings': `${ attributes.containerPadding }`,
        '--paddingsMin': `${ attributes.containerPadding/4 }`,
        '--paddingsMinPx': `${ attributes.containerPadding/4 }px`,
    };

    const kenzapContanerStyles = {
        maxWidth: `${ attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px' }`,
        '--maxWidth': `${ attributes.containerMaxWidth === '100%' ? '100wh' : attributes.containerMaxWidth + ' ' } `,
        '--maxWidthCSS': `${ attributes.containerMaxWidth === '100%' ? '2000' : attributes.containerMaxWidth + ' ' } `,
    };

    return {
        varsTop,
        vars,
        kenzapContanerStyles,
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
registerBlockType( 'kenzap/feature-list-2', {
    title: __( 'Kenzap Feature List 2', 'kenzap-features' ),
    icon: 'yes',
    category: 'layout',
    keywords: [
        __( 'feature', 'kenzap-features' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,
        // override from container
        containerPadding: {
            type: 'number',
            default: 58,
        },

        mainTitle: {
            type: 'string',
            default: __( 'Advantages of Your Business Here & Share it with Kenzap', 'kenzap-features' ),
        },

        mainTitleSize: {
            type: 'number',
            default: 30,
        },

        mainTitleColor: {
            type: 'string',
            default: '#fff',
        },

        iconSize: {
            type: 'number',
            default: 40,
        },

        titleSize: {
            type: 'number',
            default: 24,
        },

        titleColor: {
            type: 'string',
            default: '#fff',
        },

        descriptionSize: {
            type: 'number',
            default: 16,
        },

        descriptionColor: {
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

        const { varsTop, vars, kenzapContanerStyles } = getStyles( props.attributes );

        return (
            <div className={ className ? className : '' } style={ varsTop }>
                <ContainerSave
                    className={ `kenzap-featured-list-2 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                >
                    <div className="kenzap-container" style={ kenzapContanerStyles }>
                        <RichText.Content
                            tagName="h2"
                            value={ attributes.mainTitle }
                            style={ {
                                color: attributes.mainTitleColor,
                            } }
                        />
                        <div className="owl-carousel">

                            { attributes.items && attributes.items.map( item => (
                                <div key={ item.key } className="featured-box">
                                    <div className="featured-img">
                                        { item.iconMediaUrl &&
                                        <img
                                            src={ item.iconMediaUrl }
                                            alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                            style={ {
                                                height: `${ attributes.iconSize }px`,
                                            } }
                                        />
                                        }
                                    </div>
                                    <RichText.Content
                                        tagName="h3"
                                        value={ item.title }
                                        style={ {
                                            color: attributes.titleColor,
                                        } }
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        value={ item.description }
                                        style={ {
                                            color: attributes.descriptionColor,
                                        } }
                                    />
                                </div>
                            ) ) }
                        </div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
