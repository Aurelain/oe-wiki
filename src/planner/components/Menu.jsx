import {Component, createRef} from 'preact';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    background: #1f3756;
    border: solid 1px #bcb096;
    filter: drop-shadow(0 0 0.3rem black);
    border-radius: 8px;
    overflow: auto;
    z-index: 100;

    & img {
        width: 56px;
        cursor: pointer;
    }
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Menu extends Component {
    vars = {
        rootRef: createRef(),
        timeout: null,
    };
    render() {
        const {list, left, top, width, height} = this.props;
        return (
            <div className={ROOT_CSS} ref={this.vars.rootRef} style={{left, top, width, height}}>
                {Object.values(list).map((hero) => (
                    <img key={hero.id} src={hero.icon} data-id={hero.id} onClick={this.onIconClick} />
                ))}
            </div>
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
        const rootElement = this.vars.rootRef.current;
        const {target} = event;
        if (target instanceof Node && rootElement.contains(target)) {
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
