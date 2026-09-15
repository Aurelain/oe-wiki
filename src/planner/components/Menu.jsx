import {Component, createRef} from 'preact';
import {css} from 'goober';
import Panel from './Panel.jsx';
import Hint from './Hint.jsx';
import {NONE} from '../SETTINGS.js';
import cn from '../utils/cn.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const BOX = css`
    background: #1f3756;
    overflow: auto;
    & > * {
        display: inline-block;
    }
    & [data-id=${NONE}] {
        padding: 16px;
    }
`;

const ICON = css`
    width: 56px;
    cursor: pointer;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Menu extends Component {
    vars = {
        boxRef: createRef(),
        timeout: null,
    };
    render() {
        const {list, className, boxClassName, way, offset, maxWidth} = this.props;
        return (
            <Panel
                className={className}
                boxRef={this.vars.boxRef}
                boxClassName={cn(BOX, boxClassName)}
                way={way}
                offset={offset}
                maxWidth={maxWidth}
            >
                {Object.values(list).map((item) => {
                    const {Component} = item;
                    if (Component) {
                        return <Component {...item} onClick={this.onIconClick} />;
                    }
                    return (
                        <Hint title={item.name} text={item.description}>
                            <img
                                class={ICON}
                                key={item.id}
                                src={item.icon}
                                data-id={item.id}
                                onClick={this.onIconClick}
                            />
                        </Hint>
                    );
                })}
            </Panel>
        );
    }

    componentDidMount() {
        this.vars.timeout = setTimeout(this.listenForClose, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
        clearTimeout(this.vars.timeout);
        this.vars = null;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    listenForClose = () => {
        window.addEventListener('click', this.onWindowClick);
    };

    /**
     *
     */
    onWindowClick = (event) => {
        const boxElement = this.vars.boxRef.current;
        const {target} = event;
        if (target instanceof Node && boxElement.contains(target)) {
            return;
        }
        this.props.onChoice();
    };

    /**
     *
     */
    onIconClick = (event) => {
        this.props.onChoice(event.currentTarget.dataset.id);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Menu;
