import {Component} from 'preact';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    padding: 6px 8px;
`;
const TITLE = css`
    font-weight: bold;
    color: #d6bc7c;
    padding-bottom: 4px;
    width: max-content;
`;
const TEXT = css`
    color: #fff;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Hint extends Component {
    state = {
        isOpen: false,
    };
    render() {
        const {title, text} = this.props;
        return (
            <div class={ROOT}>
                {title && <div class={TITLE}>{title}</div>}
                {text && <div class={TEXT} dangerouslySetInnerHTML={{__html: text}} />}
            </div>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Hint;
