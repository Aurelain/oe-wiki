import {Component, createRef} from 'preact';
import {
    ALL,
    ARMOR,
    BANNER,
    BELT,
    BOOTS,
    CAPE,
    HEIGHT,
    HELMET,
    NONE,
    POUCH,
    RING,
    SHIELD,
    SWORD,
    WIDTH,
} from '../SETTINGS.js';
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
import Backpack from './Backpack.jsx';
import DollSlot from './DollSlot.jsx';
import ArmySlot from './ArmySlot.jsx';

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

const SKILL_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7];
const ARMY_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

const DOLL_SLOTS = [
    {slot: SWORD, storage: 'artifactSword'},
    {slot: SHIELD, storage: 'artifactShield'},
    {slot: ARMOR, storage: 'artifactArmor'},
    {slot: HELMET, storage: 'artifactHelmet'},
    {slot: BOOTS, storage: 'artifactBoots'},
    {slot: BELT, storage: 'artifactBelt'},
    {slot: CAPE, storage: 'artifactCape'},
    {slot: RING, storage: 'artifactRingL'},
    {slot: RING, storage: 'artifactRingR'},
    {slot: POUCH, storage: 'artifactPouchTL'},
    {slot: POUCH, storage: 'artifactPouchTR'},
    {slot: POUCH, storage: 'artifactPouchBL'},
    {slot: POUCH, storage: 'artifactPouchBR'},
    {slot: BANNER, storage: 'artifactBanner'},
];

const SLOT_TO_STORAGE = computeSlotToStorage();

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        appRef: createRef(),
    };
    state = {
        backpackFilter: ALL,
        recentDollStorage: null,
    };

    render() {
        // console.log('render:', JSON.stringify(this.state, null, 4));
        const {hero, level = 1, backpackFilter} = this.state;
        const {appRef} = this.vars;
        const {images, heroes, skills, heroClasses, artifacts, units} = this.props;
        const heroData = heroes[hero];
        const heroClassId = getHeroClassId(heroData);
        const heroClassData = heroClasses[heroClassId];

        return (
            <div className={APP_CSS} ref={appRef} onContextMenu={this.onRootContextMenu}>
                <style>{CSS}</style>
                <img className={BG_CSS} src={images.background} alt="empty background" />
                <Portrait hero={hero} heroes={heroes} onHeroChange={this.onHeroChange} />
                <Specialization heroData={heroData} />
                {heroData && <Labels heroData={heroData} heroClassData={heroClassData} level={level} />}
                {heroData && <Level levelUrl={images.level} value={level} onChance={this.onLevelChange} />}
                {SKILL_NUMBERS.map((nr) => (
                    <Skill
                        key={'skill' + nr}
                        nr={nr}
                        id={this.state[`skill${nr}Id`]}
                        sub1={this.state[`skill${nr}Sub1`]}
                        sub2={this.state[`skill${nr}Sub2`]}
                        skills={skills}
                        onChange={this.onSkillChange}
                        onSubskillChange={this.onSubskillChange}
                        emptyUrl={images.empty}
                        heroData={heroData}
                    />
                ))}
                <Backpack
                    images={images}
                    filter={backpackFilter}
                    onFilterClick={this.onFilterClick}
                    onArtifactClick={this.onArtifactClick}
                    artifacts={artifacts}
                    usedIds={new Set(Object.values(this.state))}
                />
                {DOLL_SLOTS.map((item) => (
                    <DollSlot
                        key={item.slot}
                        slot={item.slot}
                        slotTranslation={artifacts.categories[item.slot]}
                        storage={item.storage}
                        filled={artifacts.list[this.state[item.storage]]}
                        images={images}
                        onClick={this.onDollSlotClick}
                    />
                ))}
                {ARMY_NUMBERS.map((nr) => (
                    <ArmySlot
                        key={'unit' + nr}
                        nr={nr}
                        units={units}
                        images={images}
                        onChange={this.onUnitChange}
                        unitId={this.state[`army${nr}Id`]}
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
    onFilterClick = (filter) => {
        this.setState({backpackFilter: filter});
    };

    /**
     *
     */
    onArtifactClick = (artifactId) => {
        let slot;
        if (!artifactId) {
            slot = this.state.backpackFilter;
        } else {
            const {artifacts} = this.props;
            const artifact = artifacts.list[artifactId];
            slot = artifact.slot;
        }
        const storageKey = chooseStorageKey(slot, this.state.recentDollStorage, this.state);
        this.save({...this.state, [storageKey]: artifactId});
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
    onLevelChange = (value) => {
        this.save({...this.state, level: value === 1 ? undefined : value});
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
        if (level === 1 && value === undefined) {
            futureState[`skill${nr}Sub2`] = undefined;
        }
        this.save(futureState);
    };

    /**
     *
     */
    onDollSlotClick = (slot, storage) => {
        this.setState({
            backpackFilter: slot,
            recentDollStorage: storage,
        });
    };

    /**
     *
     */
    onUnitChange = (nr, id) => {
        const key = `army${nr}Id`;
        id = id === NONE ? undefined : id;
        this.save({...this.state, [key]: id});
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

/**
 *
 */
function getHeroClassId(heroData) {
    const matched = heroData?.classIcon.match(/\dpx-(.*?)_icon/);
    return matched ? matched[1].toLowerCase() : '';
}

/**
 *
 */
function computeSlotToStorage() {
    const output = {};
    for (const {slot, storage} of DOLL_SLOTS) {
        output[slot] = output[slot] || [];
        output[slot].push(storage);
    }
    return output;
}

/**
 *
 */
function chooseStorageKey(nativeSlot, recentDollStorage, occupied) {
    const candidates = SLOT_TO_STORAGE[nativeSlot];
    if (candidates.length === 1) {
        return candidates[0];
    }
    if (candidates.includes(recentDollStorage)) {
        return recentDollStorage;
    }
    for (const candidate of candidates) {
        if (!occupied[candidate]) {
            return candidate;
        }
    }
    return candidates[0];
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
