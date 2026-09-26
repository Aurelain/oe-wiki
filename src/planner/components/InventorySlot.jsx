import {Component} from 'preact';
import {css} from 'goober';
import Artifact from './Artifact.jsx';
import cn from '../utils/cn.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    width: 68px;
    height: 67px;
    /*background: red;*/
    position: relative;
`;

const HAS_CLICK = css`
    cursor: pointer;
`;

const SLOT = css`
    position: absolute;
    width: 68px;
    height: 67px;
    opacity: 0.8;
`;

const REMOVE = css`
    position: absolute;
    padding: 16px;
    width: 68px;
    height: 68px;
    border-radius: 8px;
    border: solid 2px transparent;
    &:hover {
        border-color: yellow;
    }
    &:active {
        border-color: peru;
    }
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class InventorySlot extends Component {
    render() {
        const {info, images, isSelected, usedArtifacts, artifacts} = this.props;
        const hasClick = info !== undefined;
        return (
            <div class={cn(ROOT, hasClick && HAS_CLICK)} onClick={hasClick && this.onRootClick}>
                {!info && <img class={SLOT} src={images.inventory} />}
                {info === null && <img class={REMOVE} src={images.empty} />}
                {info && (
                    <Artifact
                        info={info}
                        images={images}
                        isSelected={isSelected}
                        usedArtifacts={usedArtifacts}
                        artifacts={artifacts}
                    />
                )}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onRootClick = () => {
        this.props.onClick(this.props.info?.id);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default InventorySlot;
