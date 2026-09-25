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
            </Hint>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Unit;
