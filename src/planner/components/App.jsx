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
import sanitize from '../helpers/sanitize.js';
import Panel from './Panel.jsx';

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
        const {
            hero,
            skill0Id,
            skill0Sub1,
            skill0Sub2,
            skill1Id,
            skill1Sub1,
            skill1Sub2,
            skill2Id,
            skill2Sub1,
            skill2Sub2,
            skill3Id,
            skill3Sub1,
            skill3Sub2,
            skill4Id,
            skill4Sub1,
            skill4Sub2,
            skill5Id,
            skill5Sub1,
            skill5Sub2,
            skill6Id,
            skill6Sub1,
            skill6Sub2,
            skill7Id,
            skill7Sub1,
            skill7Sub2,
        } = this.state;
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
                <Skill nr={1} id={skill1Id} sub1={skill1Sub1} sub2={skill1Sub2} skills={skills} />
                <Skill nr={2} id={skill2Id} sub1={skill2Sub1} sub2={skill2Sub2} skills={skills} />
                <Skill nr={3} id={skill3Id} sub1={skill3Sub1} sub2={skill3Sub2} skills={skills} />
                <Skill nr={4} id={skill4Id} sub1={skill4Sub1} sub2={skill4Sub2} skills={skills} />
                <Skill nr={5} id={skill5Id} sub1={skill5Sub1} sub2={skill5Sub2} skills={skills} />
                <Skill nr={6} id={skill6Id} sub1={skill6Sub1} sub2={skill6Sub2} skills={skills} />
                <Skill nr={7} id={skill7Id} sub1={skill7Sub1} sub2={skill7Sub2} skills={skills} />
                <Reset />
                <Panel />
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
        Persistence.remember({hero});
    };

    /**
     *
     */
    onHashChange = (stateFragment) => {
        const {heroes, skills} = this.props;
        const sanitized = sanitize(stateFragment, heroes, skills);

        const subState = {};
        for (const field of FIELDS) {
            const {key} = field;
            subState[key] = sanitized[key];
        }

        this.setState(subState);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
