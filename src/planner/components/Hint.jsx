import {Component} from 'preact';
import {css} from 'goober';
import Panel from './Panel.jsx';
import {NORTH} from '../SETTINGS.js';
import cn from '../utils/cn.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: relative;
`;
const PANEL = css`
    left: 50%;
    top: 0;
    pointer-events: none;
    z-index: 101;
`;
const BOX = css`
    background: #191b2c;
    border-radius: 4px;
    padding: 4px 6px;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Hint extends Component {
    state = {
        isOpen: false,
    };
    render() {
        const {text, way = NORTH, children, hintClassName} = this.props;
        const {isOpen} = this.state;
        const kids = Array.isArray(children) ? children : [children];
        return (
            <div class={ROOT} onPointerEnter={this.onRootPointerEnter} onPointerLeave={this.onRootPointerLeave}>
                {kids[0]}
                {isOpen && (
                    <Panel className={cn(PANEL, hintClassName)} boxClassName={BOX} way={way} maxWidth={300}>
                        {text}
                    </Panel>
                )}
            </div>
        );
    }

    componentDidMount() {}

    componentWillUnmount() {}

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onRootPointerEnter = () => {
        this.setState({isOpen: true});
    };
    onRootPointerLeave = () => {
        this.setState({isOpen: false});
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Hint;
