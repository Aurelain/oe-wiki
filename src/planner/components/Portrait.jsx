import {Component} from 'preact';
import {css} from 'goober';
import Menu from './Menu.jsx';
import {EAST} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    left: 0;
    top: 0;
`;

const PIC_CSS = css`
    width: 100%;
`;

const MEDALLION_CSS = css`
    position: absolute;
    left: 0;
    top: -5px;
    width: 140px;
    height: 140px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    -webkit-mask: url(#compoundMask);
    mask: url(#compoundMask);
    cursor: pointer;
    /*background: red;*/
    /*filter: drop-shadow(0 0 2px rgba(255,255,255,0.5));*/
`;

const MENU = css`
    left: 152px;
    top: 84px;
    max-height: 681px;
    & img {
        width: 60px;
        height: 60px;
        outline: 1px solid transparent;
        outline-offset: -1px;
    }
    & img:hover {
        outline-color: yellow;
    }
    & img:active {
        outline-color: peru;
    }
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Portrait extends Component {
    state = {
        isOpen: false,
    };

    render() {
        const {hero, heroes} = this.props;
        const {isOpen} = this.state;
        return (
            <div className={ROOT_CSS}>
                <div className={MEDALLION_CSS} onClick={this.onMedallionClick}>
                    <svg width="0" height="0" style="position:absolute">
                        <defs>
                            <mask id="compoundMask" maskContentUnits="objectBoundingBox">
                                <rect x="0" y="0" width="1" height="0.55" fill="white" />
                                <circle cx="0.54" cy="0.58" r="0.41" fill="white" />
                            </mask>
                        </defs>
                    </svg>
                    {hero && <img className={PIC_CSS} src={heroes[hero].portrait} />}
                </div>
                {isOpen && (
                    <Menu
                        className={MENU}
                        maxWidth={543}
                        way={EAST}
                        offset={70}
                        list={heroes}
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
    onMedallionClick = () => {
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
        if (choice && choice !== this.props.hero) {
            this.props.onHeroChange(choice);
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Portrait;
