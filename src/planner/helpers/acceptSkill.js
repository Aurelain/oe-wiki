import {NONE} from '../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function acceptSkill(skillId, nr, state, heroData) {
    const draft = {...state};

    if (heroData) {
        if (heroData.skills.find((skill) => skill.name === skillId)) {
            console.warn('Refused to change into a native skill!');
            return draft;
        }
    }

    // Empty:
    if (skillId === NONE) {
        delete draft[`skill${nr}Id`];
        delete draft[`skill${nr}Sub1`];
        delete draft[`skill${nr}Sub2`];
        return draft;
    }

    // Remove existing:
    for (let i = 0; i < 8; i++) {
        if (draft[`skill${i}Id`] === skillId) {
            delete draft[`skill${i}Id`];
            delete draft[`skill${i}Sub1`];
            delete draft[`skill${i}Sub2`];
            console.log('Existing duplicate skill has been removed!');
        }
    }

    // New:
    draft[`skill${nr}Id`] = skillId;
    delete draft[`skill${nr}Sub1`];
    delete draft[`skill${nr}Sub2`];
    return draft;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default acceptSkill;
