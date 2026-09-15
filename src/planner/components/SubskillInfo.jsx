import {Component} from 'preact';
import {css} from 'goober';
import {NONE} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    padding: 6px 8px;
    display: flex;
    gap: 4px;
    &:hover {
        background: #192b44;
    }
    &:active {
        background: #191b2c;
    }
    &[data-id=${NONE}] img {
        width: 32px;
        height: 32px;
    }
`;
const ICON = css`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
`;
const TITLE = css`
    font-weight: bold;
    color: #d6bc7c;
`;
const TEXT = css`
    color: #fff;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class SubskillInfo extends Component {
    render() {
        const {id, icon, name, description, onClick} = this.props;
        return (
            <div class={ROOT} data-id={id} onClick={onClick}>
                <img class={ICON} src={icon} />
                <div>
                    <div class={TITLE}>{name}</div>
                    <div class={TEXT} dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default SubskillInfo;
