import {Component} from 'preact';
import {css} from 'goober';
import Menu from './Menu.jsx';
import {NONE, SOUTH} from '../SETTINGS.js';
import Hint from './Hint.jsx';
import cn from '../utils/cn.js';
import SubskillInfo from './SubskillInfo.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: absolute;
    cursor: pointer;
    /*background: red;*/
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: solid 1px transparent;
    &:hover {
        border-color: yellow;
    }
    &:active {
        border-color: peru;
    }
`;

const BORDERED = css`
    border: solid 1px palegoldenrod;
`;

const LEVEL_1 = css`
    left: 54px;
    top: -1px;
`;

const LEVEL_2 = css`
    left: 54px;
    top: 25px;
`;

const HIT = css`
    position: absolute;
    inset: 0;
    & img {
        width: 100%;
    }
`;

const MENU = css`
    left: 12px;
    top: 24px;
`;

const MENU_BOX = css`
    display: flex;
    flex-direction: column;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Subskill extends Component {
    state = {
        isOpen: false,
    };

    render() {
        const {family, index, level, skills} = this.props;
        const {isOpen} = this.state;
        const {subs = []} = skills[family + '_' + (level + 1)] || {};
        const subskillData = subs[index];
        return (
            <div className={cn(ROOT, level === 1 ? LEVEL_1 : LEVEL_2, !subskillData && BORDERED)}>
                <div className={HIT} onClick={this.onHitClick}>
                    {subskillData && (
                        <Hint title={subskillData.name} text={subskillData.description}>
                            <img src={subskillData.icon} />
                        </Hint>
                    )}
                </div>
                {isOpen && (
                    <Menu
                        className={MENU}
                        boxClassName={MENU_BOX}
                        maxWidth={340}
                        list={this.prepareMenuChoices(subs)}
                        onChoice={this.onMenuChoice}
                        way={SOUTH}
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
        if (choice === undefined) {
            return;
        }
        const {family, skillSlot, level, skills, index, onChange} = this.props;
        const {subs} = skills[family + '_' + (level + 1)];
        const chosenIndex = subs.findIndex((sub) => sub.id === choice);
        const currentIndex = index === undefined ? -1 : index;
        if (chosenIndex !== currentIndex) {
            onChange(chosenIndex, skillSlot, level);
        }
    };

    prepareMenuChoices = (subs) => {
        const options = subs.map((item) => {
            return {
                ...item,
                Component: SubskillInfo,
            };
        });
        options.push({
            id: NONE,
            icon: this.props.emptyUrl,
            name: '',
            description: '',
            Component: SubskillInfo,
        });
        return options;
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Subskill;
