import {Component, createRef} from 'preact';
import {HEIGHT, WIDTH} from '../SETTINGS.js';
import {css} from 'goober';
import Portrait from './Portrait.jsx';
import Level from './Level.jsx';
import Persistence from '../helpers/Persistence.js';
import Reset from './Reset.jsx';
import Specialization from './Specialization.jsx';
import Labels from './Labels.jsx';
import FIELDS from '../helpers/compression/FIELDS.js';
import Skill from './Skill.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const APP_CSS = css`
    position: absolute;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    transform-origin: 0 0;
`;

const BG_CSS = css`
    width: 100%;
    filter: drop-shadow(0 0 0.3rem black);
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        appRef: createRef(),
    };

    render() {
        const {hero, skill0Id, skill0Sub1, skill0Sub2} = this.state;
        const {appRef} = this.vars;
        const {bgUrl, levelUrl, heroes, skills} = this.props;
        const heroData = heroes[hero];

        return (
            <div className={APP_CSS} ref={appRef}>
                <style>{CSS}</style>
                <img className={BG_CSS} src={bgUrl} alt="empty background" />
                <Portrait hero={hero} heroes={heroes} onHeroChange={this.onHeroChange} />
                <Specialization heroData={heroData} />
                <Labels heroData={heroData} />
                <Level src={levelUrl} />
                <Skill nr={0} id={skill0Id} sub1={skill0Sub1} sub2={skill0Sub2} skills={skills} />
                <Reset />
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        Persistence.setup(this.onHashChange);
        this.refreshScale();
    }

    componentDidUpdate() {
        Persistence.remember(this.state);
        // console.log('componentDidUpdate:', JSON.stringify(this.state, null, 4));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onWindowResize = () => {
        this.refreshScale();
    };

    /**
     *
     */
    refreshScale = () => {
        const appElement = this.vars.appRef.current;
        const rootElement = appElement.parentNode;
        const {width} = rootElement.getBoundingClientRect();

        const coreWidth = Math.min(width, WIDTH);
        const coreHeight = (coreWidth * HEIGHT) / WIDTH;
        rootElement.style.height = Math.ceil(coreHeight) + 'px';

        const scaleRatio = coreWidth / WIDTH;
        appElement.style.transform = `scale(${scaleRatio})`;
        appElement.style.left = Math.floor((width - coreWidth) / 2) + 'px';
    };

    /**
     *
     */
    onHeroChange = (hero) => {
        const subState = {hero};
        const {heroes} = this.props;
        const heroData = heroes[hero] || {};
        const {skills} = heroData;

        if (skills[0]) {
            subState.skill0Id = skills[0].name;
            subState.skill0Sub1 = undefined;
            subState.skill0Sub2 = undefined;
        }
        if (skills[1]) {
            subState.skill1Id = skills[1].name;
            subState.skill1Sub1 = undefined;
            subState.skill1Sub2 = undefined;
        }

        this.setState(subState);
    };

    /**
     *
     */
    onHashChange = (stateFragment) => {
        const subState = {};
        for (const field of FIELDS) {
            const {key} = field;
            subState[key] = stateFragment[key];
        }
        this.setState(subState);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
