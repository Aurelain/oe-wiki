import {PureComponent} from 'preact/compat';
import {css} from 'goober';
import Artifact from './Artifact.jsx';
import cn from '../utils/cn.js';
import Hint from './Hint.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: absolute;
    width: 68px;
    height: 68px;
    cursor: pointer;
`;
const EMPTY = css`
    position: absolute;
    inset: 0;
    border-radius: 8px;
    border: solid 2px transparent;
    &:hover {
        border-color: yellow;
    }
`;

const POSITIONS = {
    artifactSword: css`
        left: 52px;
        top: 429px;
    `,
    artifactShield: css`
        left: 269px;
        top: 429px;
    `,
    artifactArmor: css`
        left: 162px;
        top: 349px;
    `,
    artifactHelmet: css`
        left: 162px;
        top: 266px;
    `,
    artifactBoots: css`
        left: 162px;
        top: 627px;
    `,
    artifactBelt: css`
        left: 162px;
        top: 429px;
    `,
    artifactCape: css`
        left: 269px;
        top: 235px;
    `,
    artifactRingL: css`
        left: 52px;
        top: 349px;
    `,
    artifactRingR: css`
        left: 269px;
        top: 349px;
    `,
    artifactPouchTL: css`
        left: 52px;
        top: 544px;
    `,
    artifactPouchTR: css`
        left: 269px;
        top: 544px;
    `,
    artifactPouchBL: css`
        left: 52px;
        top: 627px;
    `,
    artifactPouchBR: css`
        left: 269px;
        top: 627px;
    `,
    artifactBanner: css`
        left: 52px;
        top: 235px;
    `,
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class DollSlot extends PureComponent {
    render() {
        const {filled, images, storage, slotTranslation} = this.props;
        console.log('filled:', filled);
        const positionClassName = POSITIONS[storage];
        return (
            <div class={cn(ROOT, positionClassName)} onClick={this.onRootClick}>
                {!filled && <Hint title={slotTranslation} className={EMPTY}></Hint>}
                {filled && <Artifact info={filled} images={images} />}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onRootClick = () => {
        const {slot, storage} = this.props;
        this.props.onClick(slot, storage);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default DollSlot;
