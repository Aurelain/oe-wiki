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
    &:active {
        border-color: peru;
    }
`;

const POSITIONS = {
    artifactSword: css`
        left: 52px;
        top: 430px;
    `,
    artifactShield: css`
        left: 269px;
        top: 430px;
    `,
    artifactArmor: css`
        left: 162px;
        top: 348px;
    `,
    artifactHelmet: css`
        left: 162px;
        top: 266px;
    `,
    artifactBoots: css`
        left: 162px;
        top: 626px;
    `,
    artifactBelt: css`
        left: 162px;
        top: 430px;
    `,
    artifactCape: css`
        left: 269px;
        top: 235px;
    `,
    artifactRingL: css`
        left: 52px;
        top: 348px;
    `,
    artifactRingR: css`
        left: 269px;
        top: 348px;
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
        top: 626px;
    `,
    artifactPouchBR: css`
        left: 269px;
        top: 626px;
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
        const {filled, images, storage, slotTranslation, usedArtifacts} = this.props;
        const positionClassName = POSITIONS[storage];
        return (
            <div class={cn(ROOT, positionClassName)} onClick={this.onRootClick}>
                {!filled && <Hint title={slotTranslation} className={EMPTY}></Hint>}
                {filled && <Artifact info={filled} images={images} usedArtifacts={usedArtifacts} />}
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
