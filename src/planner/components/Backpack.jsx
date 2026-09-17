import {Component} from 'preact';
import {css} from 'goober';
import {ALL, ARMOR, BANNER, BELT, BOOTS, CAPE, HELMET, POUCH, RING, SHIELD, SWORD} from '../SETTINGS.js';
import InventorySlot from './InventorySlot.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: absolute;
    left: 385px;
    top: 236px;
    width: 294px;
    height: 425px;
    background: rgba(255, 0, 0, 0);
`;

const FILTERS_CSS = css`
    display: flex;
    gap: 4.4px;
    filter: invert(86%) sepia(10%) saturate(1652%) hue-rotate(2deg) brightness(500%) contrast(80%);

    & > img {
        cursor: pointer;
        width: 20px;
        opacity: 0;
    }
    & > img:hover {
        opacity: 0.5;
    }

    & > img:active {
        opacity: 0.7;
    }
`;

const FILTER_SELECTED = css`
    opacity: 1 !important;
`;

const INVENTORY = css`
    position: absolute;
    left: 0;
    top: 22px;
    right: 0;
    bottom: 0;
    background: rgba(255, 0, 0, 0);
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    background: #151e2e;
    /*opacity: 0;*/
`;

const FILTERS = {
    [ALL]: 'filter_all',
    [SWORD]: 'filter_left_hand',
    [SHIELD]: 'filter_right_hand',
    [ARMOR]: 'filter_armor',
    [HELMET]: 'filter_head',
    [BOOTS]: 'filter_boots',
    [BELT]: 'filter_belt',
    [CAPE]: 'filter_back',
    [RING]: 'filter_ring',
    [POUCH]: 'filter_item_slot',
    [BANNER]: 'filter_unique_slot',
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Backpack extends Component {
    state = {
        sorting: null,
    };
    render() {
        const {images, filter} = this.props;
        const list = buildList();
        return (
            <div class={ROOT}>
                <div class={FILTERS_CSS}>
                    {Object.keys(FILTERS).map((key) => {
                        const highlight = filter === key ? FILTER_SELECTED : null;
                        const src = images[FILTERS[key]];
                        return (
                            <img key={key} data-id={key} className={highlight} src={src} onClick={this.onFilterClick} />
                        );
                    })}
                </div>
                <div class={INVENTORY}>
                    {list.map((id) => (
                        <InventorySlot id={id} slotUrl={images.inventory} onClick={this.onArtifactClick} />
                    ))}
                </div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onFilterClick = (event) => {
        this.props.onFilterClick(event.currentTarget.dataset.id);
    };

    onArtifactClick = (id) => {
        console.log('onArtifactClick:', id);
    };
}

/**
 *
 */
function buildList() {
    const list = [];
    const length = 24;
    for (let i = 0; i < length; i++) {
        list.push(null);
    }
    return list;
}
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Backpack;
