import {Component, createRef} from 'preact';
import {css} from 'goober';
import cn from '../utils/cn.js';
import {EAST, NORTH, SOUTH, WEST} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SIZE = 12;
const HALF = SIZE / 2;

const ROOT = css`
    position: absolute;
    top: 324px;
    left: 452px;
    z-index: 100;
`;

const ARROW = css`
    position: absolute;
    top: -${HALF}px;
    left: -${HALF}px;
    width: ${SIZE}px;
    height: ${SIZE}px;
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
    border: solid 1px #bcb096;
    border-radius: 8px;
`;

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
        boxStyle: {},
    };
    render() {
        const {className, boxRef, boxClassName, children, maxWidth, way = DEFAULT_WAY} = this.props;
        const {boxStyle} = this.state;
        const ref = boxRef || this.vars.boxRef;
        return (
            <div class={cn(ROOT, className)}>
                <div ref={ref} class={cn(BOX, boxClassName)} style={{maxWidth, ...boxStyle}}>
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
        let offsetValue = offset;
        if (typeof offset !== 'number') {
            // Percents
            const percent = Number(offset.match(/\d+/)[0]);
            const ref = this.props.boxRef || this.vars.boxRef;
            const boxElement = ref.current;
            switch (way) {
                case NORTH: // fall
                case SOUTH:
                    offsetValue = Math.round((boxElement.offsetWidth * percent) / 100);
                    break;
                case EAST: // fall
                case WEST:
                    offsetValue = Math.round((boxElement.offsetHeight * percent) / 100);
                    break;
                default:
            }
        }
        switch (way) {
            case NORTH:
                this.setState({boxStyle: {left: -offsetValue, bottom: HALF}});
                break;
            case SOUTH:
                this.setState({boxStyle: {left: -offsetValue, top: HALF}});
                break;
            case EAST:
                this.setState({boxStyle: {left: HALF, top: -offsetValue}});
                break;
            case WEST:
                this.setState({boxStyle: {right: HALF, top: -offsetValue}});
                break;
            default:
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Panel;
