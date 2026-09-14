import {Component} from 'preact';
import {css} from 'goober';
import Menu from './Menu.jsx';
import {ANCHOR_TOP_50, ANCHOR_TOP_RIGHT} from '../SETTINGS.js';

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
    & > img {
        width: 100%;
        -webkit-user-drag: none;
        user-select: none;
    }
`;
const MENU = [
    /* 0 */ {left: 0, top: 52, origin: ANCHOR_TOP_50},
    /* 1 */ {left: 25, top: 52, origin: ANCHOR_TOP_50},
    /* 2 */ {left: 0, top: 52, origin: ANCHOR_TOP_50},
    /* 3 */ {left: 50, top: 52, origin: ANCHOR_TOP_RIGHT},
    /* 4 */ {left: 0, top: 52},
    /* 5 */ {left: 0, top: 52},
    /* 6 */ {left: 0, top: 52},
    /* 7 */ {left: 0, top: 52},
];

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Skill extends Component {
    state = {
        isOpen: false,
    };

    render() {
        const {nr, id, sub1, sub2, skills} = this.props;
        const {isOpen} = this.state;
        const skillData = skills[id];
        console.log('skillData:', skillData);
        const filteredSkills = this.filterSkills(skills);
        const menuProps = MENU[nr];
        return (
            <div className={`${ROOT_CSS} ${SLOTS[nr]}`} data-nr={nr}>
                <div className={HIT_CSS} onClick={this.onHitClick}>
                    {skillData && <img src={skillData.icon} />}
                </div>
                {isOpen && (
                    <Menu
                        list={filteredSkills}
                        onChoice={this.onMenuChoice}
                        width={340}
                        maxHeight={400}
                        {...menuProps}
                    />
                )}
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
            // this.props.onHeroChange(choice);
        }
    };

    filterSkills = (skills) => {
        let list = Object.values(skills);
        list = list.filter((item) => item.subs.length === 0 && !item.id.includes('faction'));
        return list;
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Skill;
