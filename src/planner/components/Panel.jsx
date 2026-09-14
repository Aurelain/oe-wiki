import {Component, createRef} from 'preact';
import {css} from 'goober';
import cn from '../utils/cn.js';
import {EAST, NORTH, SOUTH, WEST} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: absolute;
    top: 324px;
    left: 452px;
    z-index: 100;
`;

const ARROW = css`
    position: absolute;
    top: -6px;
    left: -6px;
    width: 12px;
    height: 12px;
    background-color: #bcb096;
`;

const ARROW_PLACEMENT = {
    [NORTH]: css`
        clip-path: polygon(50% 50%, 0 0, 100% 0);
    `,
    [EAST]: css`
        clip-path: polygon(50% 50%, 100% 0, 100% 100%);
    `,
    [SOUTH]: css`
        clip-path: polygon(50% 50%, 100% 100%, 0% 100%);
    `,
    [WEST]: css`
        clip-path: polygon(50% 50%, 0 100%, 0 0);
    `,
};

const BOX = css`
    position: absolute;
    width: max-content;
    max-width: 100%;
    border: solid 1px #bcb096;
    border-radius: 8px;
`;

const BOX_PLACEMENT = {
    [NORTH]: css`
        left: 0;
        bottom: 6px;
    `,
    [EAST]: css`
        left: 6px;
        top: 0;
    `,
    [SOUTH]: css`
        left: 0;
        top: 6px;
    `,
    [WEST]: css`
        right: 6px;
        top: 0;
    `,
};

const DEFAULT_WAY = NORTH;
const DEFAULT_OFFSET = '50%';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Panel extends Component {
    vars = {
        boxRef: createRef(),
    };
    state = {
        marginLeft: 0,
        marginTop: 0,
    };
    render() {
        const {className, boxRef, boxClassName, children, way = DEFAULT_WAY} = this.props;
        const {marginLeft, marginTop} = this.state;
        const ref = boxRef || this.vars.boxRef;
        return (
            <div class={cn(ROOT, className)}>
                <div ref={ref} class={cn(BOX, BOX_PLACEMENT[way], boxClassName)} style={{marginLeft, marginTop}}>
                    {...children}
                </div>
                <div class={cn(ARROW, ARROW_PLACEMENT[way])} />
            </div>
        );
    }

    componentDidMount() {
        this.applyBoxOffset();
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    applyBoxOffset = () => {
        const {way = DEFAULT_WAY, offset = DEFAULT_OFFSET} = this.props;
        if (typeof offset === 'number') {
            switch (way) {
                case NORTH: // fall
                case SOUTH:
                    this.setState({marginLeft: -offset});
                    break;
                case EAST: // fall
                case WEST:
                    this.setState({marginTop: -offset});
                    break;
                default:
            }
        } else {
            // Percents
            const value = Number(offset.match(/\d+/)[0]);
            const ref = this.props.boxRef || this.vars.boxRef;
            const boxElement = ref.current;
            switch (way) {
                case NORTH: // fall
                case SOUTH:
                    this.setState({marginLeft: -Math.round((boxElement.offsetWidth * value) / 100)});
                    break;
                case EAST: // fall
                case WEST:
                    this.setState({marginTop: -Math.round((boxElement.offsetHeight * value) / 100)});
                    break;
                default:
            }
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Panel;
