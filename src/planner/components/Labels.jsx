import {Component} from 'preact';
import {css} from 'goober';
import cn from '../utils/cn.js';
import upgradeNumbers from '../helpers/upgradeNumbers.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    font-size: 16px;
    white-space: nowrap;

    & > * {
        position: absolute;
        text-shadow: 1px 1px 2px #000;
    }
`;

const NAME_CSS = css`
    font-weight: bold;
    font-size: 18px;
    left: 208px;
    top: 8px;
`;

const CLASS_CSS = css`
    left: 208px;
    top: 42px;
`;

const HERO_CLASS_ICON = css`
    position: absolute;
    left: 148px;
    top: 0;
    width: 48px;
`;

const ATTRIBUTE = css`
    width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
`;
const ATTACK = css`
    left: 197px;
    top: 80px;
`;
const DEFENSE = css`
    left: 272px;
    top: 80px;
`;
const SPELL_POWER = css`
    left: 197px;
    top: 125px;
`;
const KNOWLEDGE = css`
    left: 272px;
    top: 125px;
`;
const LUCK = css`
    left: 197px;
    top: 171px;
`;
const MORALE = css`
    left: 272px;
    top: 171px;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Labels extends Component {
    render() {
        const {heroData: h, heroClassData: hc, level} = this.props;
        const [attack, defense, spellPower, knowledge] = upgradeNumbers(hc.bases, level, hc.chances1);
        return (
            <div className={ROOT_CSS}>
                <div class={NAME_CSS}>{h.name}</div>
                <div class={CLASS_CSS}>{h.className}</div>
                <img class={HERO_CLASS_ICON} src={h.classIcon} />
                <div class={cn(ATTRIBUTE, ATTACK)}>{attack}</div>
                <div class={cn(ATTRIBUTE, DEFENSE)}>{defense}</div>
                <div class={cn(ATTRIBUTE, SPELL_POWER)}>{spellPower}</div>
                <div class={cn(ATTRIBUTE, KNOWLEDGE)}>{knowledge}</div>
                <div class={cn(ATTRIBUTE, LUCK)}>{hc.luck}</div>
                <div class={cn(ATTRIBUTE, MORALE)}>{hc.morale}</div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Labels;
