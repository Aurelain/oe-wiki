import {Component, createRef} from 'preact';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    left: 152px;
    top: 5px;
    width: 508px;
    height: 681px;
    background: #1f3756;
    border: solid 1px #bcb096;
    filter: drop-shadow(0 0 0.3rem black);
    border-radius: 8px;
    overflow: auto;

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
        const {list} = this.props;
        return (
            <div className={ROOT_CSS} ref={this.vars.rootRef}>
                {Object.values(list).map((hero) => (
                    <img key={hero.id} src={hero.icon} onClick={this.onIconClick} />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.vars.timeout = setTimeout(this.listenForClose, 100);
    }

    componentWillUnmount() {
        clearTimeout(this.vars.timeout);
        window.removeEventListener('click', this.onWindowClick);
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
    onIconClick = () => {
        console.log('onIconClick');
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Menu;
