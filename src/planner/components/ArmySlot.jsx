import {PureComponent} from 'preact/compat';
import {css} from 'goober';
import cn from '../utils/cn.js';
import Menu from './Menu.jsx';
import {BREAK, NONE, NORTH} from '../SETTINGS.js';
import Unit from './Unit.jsx';
import Hint from './Hint.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const FIRST = 66;
const STEP = 84.5;
const HALF = 42;
const ROOT = css`
    position: absolute;
    top: 707px;
    width: ${STEP}px;
    height: 99px;
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
    left: -9px;
    top: -3px;
    width: 104px;
    height: 105px;
    pointer-events: none;
`;
const HIT = css`
    cursor: pointer;
    position: absolute;
    inset: 0;
`;
const MENU = css`
    text-align: center;
    left: ${HALF}px;
    top: 0;
    & img {
        width: 50px;
        height: 50px;
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
const UNIT_BG = css`
    position: absolute;
    left: -2px;
    top: 0;
    width: 89px;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class ArmySlot extends PureComponent {
    vars = {
        cachedList: null,
    };
    state = {
        isOpen: false,
    };

    render() {
        const {nr, images, units, unitId} = this.props;
        const {isOpen} = this.state;
        const positionClassName = POSITIONS[nr];
        const unit = units[unitId];
        return (
            <div class={cn(ROOT, isOpen && IS_OPEN, positionClassName)}>
                {unit && <img class={UNIT_BG} src={images.unit_back} />}
                {unit && <Unit info={unit} />}
                {unit && <img class={UNIT_BG} src={images.unit_top} />}
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
                <Hint
                    className={HIT}
                    boxClassName={HINT}
                    title={!isOpen && unit?.name}
                    text={!isOpen && unit?.description}
                    onClick={this.onHitClick}
                />
                {isOpen && (
                    <Menu
                        className={MENU}
                        hintBoxClassName={HINT}
                        maxWidth={660}
                        way={NORTH}
                        offset={FIRST + nr * STEP + HALF - 32}
                        list={this.listUnits()}
                        onChoice={this.onMenuChoice}
                        selected={unit?.id}
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
        const {nr, unitId} = this.props;
        this.setState({isOpen: false});
        if (choice && choice !== unitId) {
            this.props.onChange(nr, choice);
        }
    };

    /**
     *
     */
    listUnits = () => {
        let {cachedList} = this.vars;
        if (!cachedList) {
            cachedList = [];
            const {units, images} = this.props;
            let recentFaction;
            for (const key in units) {
                const unit = units[key];
                const {faction} = unit;
                if (recentFaction && recentFaction !== faction) {
                    cachedList.push({id: BREAK});
                }
                recentFaction = faction;
                cachedList.push(unit);
            }
            cachedList.push({id: NONE, icon: images.empty});
        }
        this.vars.cachedList = cachedList;
        return cachedList;
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default ArmySlot;
