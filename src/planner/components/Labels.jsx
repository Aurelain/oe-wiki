import {Component} from 'preact';
import {css} from 'goober';
import cn from '../utils/cn.js';
import upgradeNumbers from '../helpers/upgradeNumbers.js';
import Hint from './Hint.jsx';

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
    width: 62px;
    height: 22px;
    /*background: rgba(255, 0, 0, 0.3);*/
`;
const ATTACK = css`
    left: 158px;
    top: 81px;
`;
const DEFENSE = css`
    left: 231px;
    top: 81px;
`;
const SPELL_POWER = css`
    left: 158px;
    top: 126px;
`;
const KNOWLEDGE = css`
    left: 231px;
    top: 126px;
`;
const LUCK = css`
    left: 158px;
    top: 172px;
`;
const MORALE = css`
    left: 231px;
    top: 172px;
`;
const ATTRIBUTE_TEXT = css`
    position: absolute;
    left: 42px;
    top: 11px;
    width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
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
                <Hint className={cn(ATTRIBUTE, ATTACK)} text={hc.chances1[0] + '%'}>
                    <div className={ATTRIBUTE_TEXT}>{attack}</div>
                </Hint>
                <Hint className={cn(ATTRIBUTE, DEFENSE)} text={hc.chances1[1] + '%'}>
                    <div className={ATTRIBUTE_TEXT}>{defense}</div>
                </Hint>
                <Hint className={cn(ATTRIBUTE, SPELL_POWER)} text={hc.chances1[2] + '%'}>
                    <div className={ATTRIBUTE_TEXT}>{spellPower}</div>
                </Hint>
                <Hint className={cn(ATTRIBUTE, KNOWLEDGE)} text={hc.chances1[3] + '%'}>
                    <div className={ATTRIBUTE_TEXT}>{knowledge}</div>
                </Hint>
                <Hint className={cn(ATTRIBUTE, LUCK)}>
                    <div className={ATTRIBUTE_TEXT}>{hc.luck}</div>
                </Hint>
                <Hint className={cn(ATTRIBUTE, MORALE)}>
                    <div className={ATTRIBUTE_TEXT}>{hc.morale}</div>
                </Hint>
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
