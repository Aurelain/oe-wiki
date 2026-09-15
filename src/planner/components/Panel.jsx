import {createRef} from 'preact';
import {PureComponent} from 'preact/compat';
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
    filter: drop-shadow(0 0 0.3rem black);
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
class Panel extends PureComponent {
    vars = {
        rootRef: createRef(),
        boxRef: createRef(),
    };
    state = {
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
    };
    render() {
        const {className, rootRef, boxRef, boxClassName, children, maxWidth, way = DEFAULT_WAY} = this.props;
        const kids = Array.isArray(children) ? children : [children];
        const {left, right, top, bottom} = this.state;
        const usedRootRef = rootRef || this.vars.rootRef;
        const usedBoxRef = boxRef || this.vars.boxRef;
        return (
            <div class={cn(ROOT, className)} ref={usedRootRef}>
                <div ref={usedBoxRef} class={cn(BOX, boxClassName)} style={{maxWidth, left, right, top, bottom}}>
                    {...kids}
                </div>
                <div class={cn(ARROW, ARROW_PLACEMENT[way])} />
            </div>
        );
    }

    componentDidMount() {
        this.refreshBoxOffset();
        window.addEventListener('resize', this.onWindowResize);
    }

    componentDidUpdate() {
        this.refreshBoxOffset();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onWindowResize = () => {
        this.refreshBoxOffset();
    };

    refreshBoxOffset = () => {
        const {way = DEFAULT_WAY, offset = DEFAULT_OFFSET, rootRef, boxRef} = this.props;
        const rootElement = (rootRef || this.vars.rootRef).current;
        const boxElement = (boxRef || this.vars.boxRef).current;

        const offsetValue = resolveOffset(offset, boxElement, way);

        let coordinates;
        switch (way) {
            case NORTH:
                coordinates = {left: -offsetValue, top: -HALF - boxElement.offsetHeight};
                break;
            case SOUTH:
                coordinates = {left: -offsetValue, top: HALF};
                break;
            case EAST:
                coordinates = {left: HALF, top: -offsetValue};
                break;
            case WEST:
                coordinates = {left: -HALF - boxElement.offsetWidth, top: -offsetValue};
                break;
            default:
        }
        const imprisoned = imprisonCoordinates(coordinates, boxElement, rootElement);
        this.setState(imprisoned);
    };
}

/**
 *
 */
function resolveOffset(offset, element, way) {
    if (typeof offset === 'number') {
        return offset;
    }
    const percent = Number(offset.match(/\d+/)[0]); // assumption
    switch (way) {
        case NORTH: // fall
        case SOUTH:
            return Math.round((element.offsetWidth * percent) / 100);
        case EAST: // fall
        case WEST:
            return Math.round((element.offsetHeight * percent) / 100);
        default:
            return 0;
    }
}

/**
 *
 */
function imprisonCoordinates(coordinates, boxElement, rootElement) {
    const boxBounds = boxElement.getBoundingClientRect();
    const rootBounds = rootElement.getBoundingClientRect();
    const scaleRatio = boxBounds.width / boxElement.offsetWidth;

    const futureRightmostBound = rootBounds.left + boxBounds.width + coordinates.left * scaleRatio;
    const overflowRight = futureRightmostBound - (window.innerWidth - 20);
    if (overflowRight > 0) {
        return {
            left: coordinates.left - overflowRight / scaleRatio,
            top: coordinates.top,
        };
    }
    const futureLeftmostBound = rootBounds.left + coordinates.left * scaleRatio;
    const overflowLeft = 5 - futureLeftmostBound;
    if (overflowLeft > 0) {
        return {
            left: coordinates.left + overflowLeft / scaleRatio,
            top: coordinates.top,
        };
    }

    return coordinates;
}
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Panel;
