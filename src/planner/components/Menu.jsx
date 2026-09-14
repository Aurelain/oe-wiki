import {Component, createRef} from 'preact';
import {css} from 'goober';
import Panel from './Panel.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const BOX = css`
    background: #1f3756;
    filter: drop-shadow(0 0 0.3rem black);
    overflow: auto;
    & > img {
        width: 56px;
        cursor: pointer;
    }
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
        const {list, className, way, offset, maxWidth} = this.props;
        return (
            <Panel
                className={className}
                boxRef={this.vars.boxRef}
                boxClassName={BOX}
                way={way}
                offset={offset}
                maxWidth={maxWidth}
            >
                {Object.values(list).map((hero) => (
                    <img key={hero.id} src={hero.icon} data-id={hero.id} onClick={this.onIconClick} />
                ))}
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
        this.props.onChoice(event.target.dataset.id);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Menu;
