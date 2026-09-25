import {Component} from 'preact';
import {css} from 'goober';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    position: absolute;
    left: 50px;
    top: 111px;
    width: 51px;
    height: 51px;
    border-radius: 50%;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    line-height: 47px;
    text-align: center;
    color: #bea76f;
    font-size: 18px;
    text-shadow: 1px 1px 2px #000;
    border: solid 2px transparent;
    &:hover {
        border-color: yellow;
    }
    &:active {
        border-color: peru;
    }
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Level extends Component {
    render() {
        const {levelUrl, value} = this.props;
        return (
            <div class={ROOT} style={{backgroundImage: `url(${levelUrl})`}} onClick={this.onRootClick}>
                {value}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onRootClick = () => {
        const {value, onChance} = this.props;
        onChance(value !== 23 ? 23 : 1);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Level;
