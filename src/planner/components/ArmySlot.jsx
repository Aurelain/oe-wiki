import {PureComponent} from 'preact/compat';
import {css} from 'goober';
import cn from '../utils/cn.js';
import Menu from './Menu.jsx';
import {NORTH, WIDTH} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const FIRST = 66;
const STEP = 84;
const HALF = 42;
const ROOT = css`
    position: absolute;
    top: 707px;
    width: ${STEP}px;
    height: 99px;
    cursor: pointer;
    color: transparent;
    /*background: rgba(255, 0, 0, 0.2);*/
    &:hover {
        color: yellow;
    }
    &:active {
        color: peru;
    }
`;
const IS_OPEN = css`
    color: yellow;
`;
const SVG = css`
    position: absolute;
    left: -11px;
    top: -6px;
    width: 109px;
    height: 111px;
    pointer-events: none;
`;
const HIT = css`
    position: absolute;
    inset: 0;
`;
const MENU = css`
    left: ${HALF}px;
    top: 0;
    max-height: 681px;
    & img {
        outline: 1px solid transparent;
        outline-offset: -1px;
        width: 54px;
        height: 54px;
    }
    & img:hover {
        outline-color: yellow;
    }
    & img:active {
        outline-color: peru;
    }
`;
const HINT = css`
    & img {
        width: 32px;
        height: 32px;
    }
`;

const POSITIONS = {
    0: css`
        left: ${FIRST}px;
    `,
    1: css`
        left: ${FIRST + STEP}px;
    `,
    2: css`
        left: ${FIRST + STEP * 2}px;
    `,
    3: css`
        left: ${FIRST + STEP * 3}px;
    `,
    4: css`
        left: ${FIRST + STEP * 4}px;
    `,
    5: css`
        left: ${FIRST + STEP * 5}px;
    `,
    6: css`
        left: ${FIRST + STEP * 6}px;
    `,
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class ArmySlot extends PureComponent {
    state = {
        isOpen: false,
    };

    render() {
        const {nr, units} = this.props;
        const {isOpen} = this.state;
        const positionClassName = POSITIONS[nr];
        return (
            <div class={cn(ROOT, isOpen && IS_OPEN, positionClassName)}>
                <svg className={SVG} viewBox="0 0 500 600" preserveAspectRatio="none">
                    <path
                        d="M 250,56
                           C 257,61 278,72 308,72
                           L 395,72
                           C 415,72 430,87 430,107
                           L 430,493
                           C 430,513 415,528 395,528
                           L 308,528
                           C 278,528 257,539 250,544
                           C 243,539 222,528 192,528
                           L 105,528
                           C 85,528 70,513 70,493
                           L 70,107
                           C 70,87 85,72 105,72
                           L 192,72
                           C 222,72 243,61 250,56
                           Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="12"
                        stroke-linejoin="round"
                    />
                </svg>
                <div class={HIT} onClick={this.onHitClick} />
                {isOpen && (
                    <Menu
                        className={MENU}
                        hintClassName={HINT}
                        maxWidth={WIDTH}
                        way={NORTH}
                        offset={FIRST + nr * STEP + HALF}
                        list={units}
                        onChoice={this.onMenuChoice}
                    />
                )}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onHitClick = () => {
        if (!this.state.isOpen) {
            this.setState({isOpen: true});
        }
    };

    /**
     *
     */
    onMenuChoice = (choice) => {
        console.log('choice:', choice);
        this.setState({isOpen: false});
        // if (choice && choice !== this.props.hero) {
        //     this.props.onHeroChange(choice);
        // }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default ArmySlot;
