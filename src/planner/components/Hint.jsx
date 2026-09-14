import {Component, createRef} from 'preact';
import {createPortal} from 'preact/compat';
import {css} from 'goober';
import Panel from './Panel.jsx';
import {EAST, NORTH, SOUTH, WEST} from '../SETTINGS.js';
import cn from '../utils/cn.js';
import HintContent from './HintContent.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: relative;
`;
const PANEL = css`
    position: fixed;
    pointer-events: none;
    z-index: 9999;
`;
const BOX = css`
    background: #191b2c;
    border-radius: 4px;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Hint extends Component {
    vars = {
        triggerRef: createRef(),
        panelRef: createRef(),
    };
    state = {
        isOpen: false,
    };
    render() {
        const {text, title, way = NORTH, children, hintClassName} = this.props;
        const {isOpen} = this.state;
        const kids = Array.isArray(children) ? children : [children];
        return (
            <div
                class={ROOT}
                ref={this.vars.triggerRef}
                onPointerEnter={this.onRootPointerEnter}
                onPointerLeave={this.onRootPointerLeave}
            >
                {kids[0]}
                {isOpen &&
                    Boolean(title || text) &&
                    createPortal(
                        <Panel
                            rootRef={this.vars.panelRef}
                            className={cn(PANEL, hintClassName)}
                            boxClassName={BOX}
                            way={way}
                            maxWidth={320}
                        >
                            <HintContent title={title} text={text} />
                        </Panel>,
                        document.body,
                    )}
            </div>
        );
    }

    componentDidUpdate() {
        if (this.state.isOpen) {
            this.refreshPanelPosition();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onRootPointerEnter = () => {
        this.setState({isOpen: true});
    };

    onRootPointerLeave = () => {
        this.setState({isOpen: false});
    };

    refreshPanelPosition = () => {
        const panelElement = this.vars.panelRef.current;
        if (!panelElement) {
            return;
        }
        const triggerElement = this.vars.triggerRef.current;
        const b = triggerElement.getBoundingClientRect();
        const {way = NORTH} = this.props;
        switch (way) {
            case NORTH:
                panelElement.style.left = Math.round(b.x + b.width / 2) + 'px';
                panelElement.style.top = Math.round(b.y) + 'px';
                break;
            case SOUTH:
                panelElement.style.left = Math.round(b.x + b.width / 2) + 'px';
                panelElement.style.top = Math.round(b.y + b.height) + 'px';
                break;
            case EAST:
                panelElement.style.left = Math.round(b.x + b.width) + 'px';
                panelElement.style.top = Math.round(b.y + b.height / 2) + 'px';
                break;
            case WEST:
                panelElement.style.left = Math.round(b.x) + 'px';
                panelElement.style.top = Math.round(b.y + b.height / 2) + 'px';
                break;
            default:
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Hint;
