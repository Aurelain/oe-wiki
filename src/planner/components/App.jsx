import {Component, createRef} from 'preact';
import {HEIGHT, WIDTH} from '../SETTINGS.js';
import CSS from '../CSS.js';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const APP_CSS = css`
    position: absolute;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    transform-origin: 0 0;
`;

const BG_CSS = css`
    width: 100%;
    filter: drop-shadow(0 0 0.3rem black);
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        appRef: createRef(),
    };

    render() {
        const {appRef} = this.vars;
        const {bgUrl} = this.props.setup;

        return (
            <div className={APP_CSS} ref={appRef}>
                <style>{CSS}</style>
                <img className={BG_CSS} src={bgUrl} alt="empty background" />
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.refreshScale();
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onWindowResize = () => {
        this.refreshScale();
    };

    /**
     *
     */
    refreshScale = () => {
        const appElement = this.vars.appRef.current;
        const rootElement = appElement.parentNode;
        const {width} = rootElement.getBoundingClientRect();

        const coreWidth = Math.min(width, WIDTH);
        const coreHeight = (coreWidth * HEIGHT) / WIDTH;
        rootElement.style.height = Math.ceil(coreHeight) + 'px';

        const scaleRatio = coreWidth / WIDTH;
        appElement.style.transform = `scale(${scaleRatio})`;
        appElement.style.left = Math.floor((width - coreWidth) / 2) + 'px';
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
