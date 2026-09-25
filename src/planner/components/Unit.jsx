import {Component} from 'preact';
import {css} from 'goober';
import Hint from './Hint.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT_CSS = css`
    position: absolute;
    left: 8px;
    top: 10px;
    width: 68px;
    height: 80px;
    /*background: red;*/
    overflow: hidden;
    & img {
        position: absolute;
        bottom: 0;
        left: -5px;
        width: 80px;
    }
`;
const COUNT = css`
    color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 24px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 1px 1px 2px #000;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Unit extends Component {
    render() {
        const {info} = this.props;
        const {icon, name, description} = info;
        return (
            <Hint className={ROOT_CSS} title={name} text={description}>
                <img src={icon} />
                <div class={COUNT}>{info.growth}</div>
            </Hint>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Unit;
