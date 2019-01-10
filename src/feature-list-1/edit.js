const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { MediaUpload, RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { RangeControl, CheckboxControl } = wp.components;

import { defaultItem, getStyles } from './block';
import { Plus } from '../commonComponents/icons/plus';

/**
 * Keys for new blocks
 * @type {number}
 */
let key = 0;

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 * @param {Object} props - attributes
 * @returns {Node} rendered component
 */
export default class Edit extends Component {
    state = {
        activeSubBlock: -1,
    };

    /**
     * Add a new item to list with default fields
     */
    addItem = () => {
        key++;
        this.props.setAttributes( {
            items: [ ...this.props.attributes.items, {
                ...defaultItem,
                title: defaultItem.title + ' ' + ( key ),
                key: 'new ' + new Date().getTime(),
            } ],
        } );
    };

    /**
     * Change any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onChangePropertyItem = ( property, value, index, withMutation = false ) => {
        const items = withMutation ? [ ...this.props.attributes.items ] : this.props.attributes.items;
        if ( ! items[ index ] || typeof items[ index ][ property ] !== 'string' ) {
            return;
        }
        items[ index ][ property ] = value;
        this.props.setAttributes( { items: items } );
    };

    /**
     * Remove item
     * It also add default item if we remove all elements from array
     * @param {number} index - of item
     */
    removeItem = ( index ) => {
        const items = [ ...this.props.attributes.items ];
        if ( items.length === 1 ) {
            this.props.setAttributes( { items: [ defaultItem ] } );
        } else {
            items.splice( index, 1 );
            this.props.setAttributes( { items: items } );
        }
    };

    render() {
        const {
            className,
            attributes,
            setAttributes,
        } = this.props;

        const {
            featuredImg,
            title,
            description,
            container,
        } = getStyles( attributes );

        return (
            <div className={ className }>
                <InspectorControls>
                    <RangeControl
                        label={ __( 'Icons size', 'kenzap-features' ) }
                        value={ attributes.iconSize }
                        onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
                        min={ 50 }
                        max={ 130 }
                    />
                    <RangeControl
                        label={ __( 'Title size', 'kenzap-features' ) }
                        value={ attributes.titleSize }
                        onChange={ ( titleSize ) => setAttributes( { titleSize } ) }
                        min={ 20 }
                        max={ 100 }
                    />
                    <RangeControl
                        label={ __( 'Description size', 'kenzap-features' ) }
                        value={ attributes.descriptionSize }
                        onChange={ ( descriptionSize ) => setAttributes( { descriptionSize } ) }
                        min={ 10 }
                        max={ 30 }
                    />

                    <PanelColorSettings
                        title={ __( 'Colors' ) }
                        initialOpen={ false }
                        colorSettings={ [
                            {
                                value: attributes.titleColor,
                                onChange: ( value ) => {
                                    setAttributes( { titleColor: value } );
                                },
                                label: __( 'Title color', 'kenzap-features' ),
                            },
                            {
                                value: attributes.descriptionColor,
                                onChange: ( value ) => {
                                    setAttributes( { descriptionColor: value } );
                                },
                                label: __( 'Description color', 'kenzap-features' ),
                            },
                        ] }
                    />

                    <div style={ { margin: '10px 0' } }>
                        <CheckboxControl
                            label={ __( 'Is hover enabled?', 'kenzap-features' ) }
                            checked={ attributes.isHoverEnabled }
                            onChange={ ( isChecked ) => {
                                setAttributes( { isHoverEnabled: isChecked } );
                            } }
                        />
                    </div>
                    
                    { attributes.isHoverEnabled && (
                        <PanelColorSettings
                            title={ __( 'Hover colors', 'kenzap-features' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    value: attributes.backgroundColorOnHover,
                                    onChange: ( value ) => {
                                        setAttributes( { backgroundColorOnHover: value } );
                                    },
                                    label: __( 'Background color on hover', 'kenzap-features' ),
                                },
                                {
                                    value: attributes.titleColorOnHover,
                                    onChange: ( value ) => {
                                        setAttributes( { titleColorOnHover: value } );
                                    },
                                    label: __( 'Title color on hover', 'kenzap-features' ),
                                },
                                {
                                    value: attributes.descriptionColorOnHover,
                                    onChange: ( value ) => {
                                        setAttributes( { descriptionColorOnHover: value } );
                                    },
                                    label: __( 'Description color on hover', 'kenzap-features' ),
                                },
                            ] }
                        />
                    ) }
                </InspectorControls>
                <div
                    className={ `kenzap-featured-list-1 ${ attributes.isHoverEnabled ? 'hover-enabled' : '' } ${ className ? className : '' }` }
                    style={ { ...container } }
                >
                    { attributes.items && attributes.items.map( ( item, index ) => (
                        <div
                            key={ item.key }
                            className="featured-box"
                        >
                            <button
                                className="remove" onClick={ () => this.removeItem( index ) }>
                                <span className="dashicons dashicons-no" />
                            </button>
                            <div className="featured-img">
                                { item.iconMediaUrl ? (
                                    <MediaUpload
                                        onSelect={ ( media ) => {
                                    this.onChangePropertyItem( 'iconMediaId', media.id, index );
                                    this.onChangePropertyItem( 'iconMediaUrl', media.url, index, true );
                                } }
                                        value={ item.iconMediaId }
                                        allowedTypes={ [ 'image', 'image/svg+xml' ] }
                                        render={ ( props ) => (
                                            <img
                                                src={ item.iconMediaUrl }
                                                alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                                style={ { ...featuredImg, cursor: 'pointer' } }
                                                onClick={ props.open }
                                                role="presentation"
                                            />
                                    ) }
                                    />
                                ) : (
                                    <div
                                        className="addIcon"
                                        style={ featuredImg }
                                    >
                                        <MediaUpload
                                            onSelect={ ( media ) => {
                                                this.onChangePropertyItem( 'iconMediaId', media.id, index );
                                                this.onChangePropertyItem( 'iconMediaUrl', media.url, index, true );
                                            } }
                                            value={ item.iconMediaId }
                                            allowedTypes={ [ 'image', 'image/svg+xml' ] }
                                            render={ ( props ) => (
                                                <button onClick={ props.open }>
                                                    { __( 'Upload/Choose icon', 'kenzap-features' ) }
                                                </button>
                                            ) }
                                        />
                                    </div>
                                ) }
                            </div>
                            <RichText
                                tagName="h3"
                                placeholder={ __( 'Title', 'kenzap-features' ) }
                                value={ item.title }
                                onChange={ ( value ) => this.onChangePropertyItem( 'title', value, index, true ) }
                                onSplit={ () => null }
                                style={ title }
                            />
                            <RichText
                                tagName="ul"
                                placeholder={ __( 'Description', 'kenzap-features' ) }
                                value={ item.description }
                                onChange={ ( value ) => this.onChangePropertyItem( 'description', value, index, true ) }
                                multiline="li"
                                style={ description }
                                onSplit={ () => null }
                            />
                        </div>
                    ) ) }
                </div>
                <div className="editPadding"/> 
                <button className="kenzap-add" onClick={ this.addItem }>
                    <Plus />
                    <span/>{ __( 'Add new feature', 'kenzap-features' ) }
                </button>
            </div>
        );
    }
}
