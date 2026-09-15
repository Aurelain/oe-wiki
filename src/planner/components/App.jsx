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
import acceptSkill from '../helpers/acceptSkill.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const APP_CSS = css`
    position: absolute;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    transform-origin: 0 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    & img {
        -webkit-user-drag: none;
        user-select: none;
    }
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
        // console.log('render:', JSON.stringify(this.state, null, 4));
        const {hero} = this.state;
        const {appRef} = this.vars;
        const {bgUrl, levelUrl, emptyUrl, heroes, skills} = this.props;
        const heroData = heroes[hero];
        const skillNumbers = [0, 1, 2, 3, 4, 5, 6, 7];

        return (
            <div className={APP_CSS} ref={appRef} onContextMenu={this.onRootContextMenu}>
                <style>{CSS}</style>
                <img className={BG_CSS} src={bgUrl} alt="empty background" />
                <Portrait hero={hero} heroes={heroes} onHeroChange={this.onHeroChange} />
                <Specialization heroData={heroData} />
                <Labels heroData={heroData} />
                <Level src={levelUrl} />
                {skillNumbers.map((nr) => (
                    <Skill
                        key={'skill' + nr}
                        nr={nr}
                        id={this.state[`skill${nr}Id`]}
                        sub1={this.state[`skill${nr}Sub1`]}
                        sub2={this.state[`skill${nr}Sub2`]}
                        skills={skills}
                        onChange={this.onSkillChange}
                        onSubskillChange={this.onSubskillChange}
                        emptyUrl={emptyUrl}
                        heroData={heroData}
                    />
                ))}
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
    onRootContextMenu = (event) => {
        event.preventDefault();
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
        this.save({...this.state, hero});
    };

    /**
     *
     */
    onSkillChange = (choice, nr) => {
        const {heroes} = this.props;
        const heroData = heroes[this.state.hero];
        const futureState = acceptSkill(choice, nr, this.state, heroData);
        this.save(futureState);
    };

    /**
     *
     */
    onSubskillChange = (choice, nr, level) => {
        const key = `skill${nr}Sub${level}`;
        const value = choice === -1 ? undefined : choice;
        const futureState = {...this.state, [key]: value};
        this.save(futureState);
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

    /**
     *
     */
    save = (futureState) => {
        const {heroes, skills} = this.props;
        const safeState = sanitize(futureState, heroes, skills);
        Persistence.remember(safeState);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
