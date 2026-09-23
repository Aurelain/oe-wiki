import {Component} from 'preact';
import {css} from 'goober';
import {COMMON, EPIC, LEGENDARY, RARE} from '../SETTINGS.js';
import Hint from './Hint.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    width: 64px;
    height: 64px;
    left: 2px;
    top: 2px;
    cursor: pointer;
    border-radius: 8px;
    outline: solid 2px transparent;

    &:hover {
        outline-color: yellow;
    }
`;

const CONTAINER_CSS = css`
    width: 100%;
    height: 100%;
    background-size: 100%;

    & > img {
        width: 100%;
    }
`;

const RARITY_TO_IMAGE = {
    [COMMON]: 'rarity_common',
    [RARE]: 'rarity_rare',
    [EPIC]: 'rarity_epic',
    [LEGENDARY]: 'rarity_legendary',
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Artifact extends Component {
    render() {
        const {info, images} = this.props;
        const {icon, rarity, name, description} = info;
        const bg = images[RARITY_TO_IMAGE[rarity]];
        return (
            <Hint className={ROOT_CSS} title={name} text={description}>
                <div class={CONTAINER_CSS} style={{backgroundImage: `url(${bg})`}}>
                    <img src={icon} />
                </div>
            </Hint>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Artifact;
