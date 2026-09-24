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
    height: 424px;
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
    overflow-y: auto;
    background: #151e2e;
    align-content: flex-start;
`;

const FILTER_TO_ICON = {
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
        const {images, filter, artifacts, onArtifactClick} = this.props;
        const list = buildList(artifacts, filter);
        return (
            <div class={ROOT}>
                <div class={FILTERS_CSS}>
                    {Object.keys(FILTER_TO_ICON).map((key) => {
                        const highlight = filter === key ? FILTER_SELECTED : null;
                        const src = images[FILTER_TO_ICON[key]];
                        return (
                            <img key={key} data-id={key} className={highlight} src={src} onClick={this.onFilterClick} />
                        );
                    })}
                </div>
                <div class={INVENTORY}>
                    {list.map((info) => (
                        <InventorySlot
                            info={info}
                            slotUrl={images.inventory}
                            onClick={onArtifactClick}
                            images={images}
                        />
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
}

/**
 *
 */
function buildList(artifacts, filter) {
    let list = Object.values(artifacts.list);
    if (filter !== ALL) {
        list = list.filter((item) => item.slot === filter);
    }
    const rows = Math.ceil(Math.max(list.length, 24) / 4);
    const length = rows * 4;
    for (let i = list.length; i < length; i++) {
        list.push(null);
    }
    return list;
}
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Backpack;
