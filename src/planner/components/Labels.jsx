import {Component} from 'preact';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;

    & > * {
        position: absolute;
    }
`;

const NAME_CSS = css`
    left: 208px;
    top: 8px;
`;

const CLASS_CSS = css`
    left: 208px;
    top: 42px;
    font-size: 16px;
    font-weight: normal;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Labels extends Component {
    render() {
        const {heroData} = this.props;
        console.log('heroData.name:', heroData?.name);
        return (
            <div className={ROOT_CSS}>
                {heroData && <div className={NAME_CSS}>{heroData.name}</div>}
                {heroData && <div className={CLASS_CSS}>{heroData.className}</div>}
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
