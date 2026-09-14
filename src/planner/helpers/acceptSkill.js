import {NONE} from '../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function acceptSkill(skillId, nr, state) {
    const draft = {...state};

    // Empty:
    if (skillId === NONE) {
        draft[`skill${nr}Id`] = undefined;
        draft[`skill${nr}Sub1`] = 0;
        draft[`skill${nr}Sub2`] = 0;
        return draft;
    }

    // Remove existing:
    for (let i = 0; i < 8; i++) {
        if (draft[`skill${i}Id`] === skillId) {
            draft[`skill${i}Id`] = undefined;
            draft[`skill${i}Sub1`] = 0;
            draft[`skill${i}Sub2`] = 0;
        }
    }

    // New:
    draft[`skill${nr}Id`] = skillId;
    draft[`skill${nr}Sub1`] = 0;
    draft[`skill${nr}Sub2`] = 0;
    return draft;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default acceptSkill;
