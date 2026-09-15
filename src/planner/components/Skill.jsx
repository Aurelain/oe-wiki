import {Component} from 'preact';
import {css} from 'goober';
import Menu from './Menu.jsx';
import {NONE, SOUTH} from '../SETTINGS.js';
import Hint from './Hint.jsx';
import cn from '../utils/cn.js';
import Subskill from './Subskill.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    cursor: pointer;
    /*background: red;*/
    width: 50px;
    height: 50px;
`;
const SLOTS = [
    /* 0 */ css`
        left: 326px;
        top: 83px;
    `,
    /* 1 */ css`
        left: 417px;
        top: 83px;
    `,
    /* 2 */ css`
        left: 508px;
        top: 83px;
    `,
    /* 3 */ css`
        left: 599px;
        top: 83px;
    `,
    /* 4 */ css`
        left: 326px;
        top: 143px;
    `,
    /* 5 */ css`
        left: 417px;
        top: 143px;
    `,
    /* 6 */ css`
        left: 508px;
        top: 143px;
    `,
    /* 7 */ css`
        left: 599px;
        top: 143px;
    `,
];

const HIT_CSS = css`
    position: absolute;
    inset: 0;
    & img {
        width: 100%;
    }
`;

const FORBIDDEN = css`
    cursor: not-allowed;
`;

const MENU = css`
    left: 25px;
    top: 52px;
`;

const LEVEL = css`
    position: absolute;
    right: 4px;
    bottom: 0;
    color: #fff;
    font-family: Arial, sans-serif;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Skill extends Component {
    state = {
        isOpen: false,
    };

    render() {
        const {nr, id, skills, heroData, sub1, sub2, onSubskillChange, emptyUrl} = this.props;
        const {isOpen} = this.state;
        const skillData = skills[id];
        const isDisabled = Boolean(heroData?.skills[nr]);
        return (
            <div className={cn(ROOT_CSS, SLOTS[nr], isDisabled && FORBIDDEN)}>
                <div className={HIT_CSS} onClick={!isDisabled && this.onHitClick}>
                    {skillData && (
                        <Hint title={skillData.name} text={skillData.description}>
                            <img src={skillData.icon} />
                        </Hint>
                    )}
                </div>
                {isOpen && (
                    <Menu
                        className={MENU}
                        maxWidth={340}
                        list={this.filterSkills(skills)}
                        onChoice={this.onMenuChoice}
                        way={SOUTH}
                    />
                )}
                {skillData && (
                    <Subskill
                        family={id}
                        skillSlot={nr}
                        index={sub1}
                        level={1}
                        skills={skills}
                        onChange={onSubskillChange}
                        emptyUrl={emptyUrl}
                    />
                )}
                {sub1 !== undefined && (
                    <Subskill
                        family={id}
                        skillSlot={nr}
                        index={sub2}
                        level={2}
                        skills={skills}
                        onChange={onSubskillChange}
                        emptyUrl={emptyUrl}
                    />
                )}
                <div class={LEVEL}>{computeLevel(skillData, sub1, sub2)}</div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onHitClick = () => {
        if (!this.state.isOpen) {
            this.setState({isOpen: true});
        }
    };

    onMenuChoice = (choice) => {
        console.log('choice:', choice);
        this.setState({isOpen: false});
        if (choice && choice !== this.props.id) {
            this.props.onChange(choice, this.props.nr);
        }
    };

    filterSkills = (skills) => {
        const {emptyUrl, heroData = {}} = this.props;
        const {isMight} = heroData;
        let list = Object.values(skills);
        list = list.filter((item) => {
            if (item.subs.length) {
                return false; // exclude Advanced and Expert
            }
            if (item.id.includes('faction')) {
                return false; // exclude faction skills
            }
            if (!isMight && item.id === 'skill_battle_artistry') {
                return false; // exclude Combat for Magic heroes
            }
            if (isMight && item.id === 'skill_wisdom') {
                return false; // exclude Thaumaturgy for Might heroes
            }
            return true;
        });
        list.push({id: NONE, icon: emptyUrl});
        return list;
    };
}

/**
 *
 */
function computeLevel(skillData, sub1, sub2) {
    if (!skillData) {
        return '';
    }
    if (sub1 === undefined) {
        return 1;
    }
    if (sub2 === undefined) {
        return 2;
    }
    return 3;
}
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Skill;
