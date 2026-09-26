import {Component} from 'preact';
import {css} from 'goober';
import cn from '../utils/cn.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    margin-top: 16px;
`;
const TITLE = css`
    text-align: center;
    font-weight: bold;
    color: #d6bc7c;
`;
const MEMBERS = css`
    display: flex;
    justify-content: center;
    & > img {
        width: 32px;
        height: 32px;
    }
`;
const LEVEL = css`
    display: flex;
    margin-top: 8px;
`;
const LEVEL_RADIO = css`
    position: relative;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: solid 3px #566578;
    margin-right: 8px;
`;
const SELECTED_RADIO = css`
    &:after {
        position: absolute;
        content: '✔️';
        left: 2px;
        top: -5px;
    }
`;
const LEVEL_TEXT = css`
    flex-grow: 1;
`;
const SELECTED_TEXT = css`
    color: cyan;
`;
const LEVEL_TITLE = css`
    font-weight: bold;
    color: peru;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class ArtifactSet extends Component {
    render() {
        const {usedArtifacts, artifacts, currentArtifact} = this.props;
        const currentSet = artifacts.sets[currentArtifact.setId];
        if (!currentSet) {
            return null;
        }

        const usedMembers = computeUsedMembers(usedArtifacts, artifacts, currentSet);
        const suffix = usedMembers ? ` (${usedMembers}/${currentSet.members.length})` : '';
        return (
            <div class={ROOT}>
                <div class={TITLE}>
                    {currentSet.name}
                    {suffix}
                </div>
                <div class={MEMBERS}>
                    {currentSet.members.map((id) => (
                        <img key={id} src={artifacts.list[id].icon} />
                    ))}
                </div>
                {currentSet.levels.map((levelInfo) => {
                    const {count, about, text} = levelInfo;
                    const isSelected = count <= usedMembers;
                    return (
                        <div class={LEVEL}>
                            <div class={cn(LEVEL_RADIO, isSelected && SELECTED_RADIO)} />
                            <div class={LEVEL_TEXT}>
                                <div class={LEVEL_TITLE}>{about}</div>
                                <div class={isSelected && SELECTED_TEXT}>{text}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

function computeUsedMembers(usedArtifacts, artifacts, currentSet) {
    const members = new Set(currentSet.members);
    const found = Array.from(usedArtifacts).filter((id) => members.has(id));
    return found.length;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default ArtifactSet;
