// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function sanitize(stateFragment, heroes, skills) {
    const draft = {...stateFragment};

    removeUnknownHero(draft, heroes);
    removeUnknownSkill(draft, skills);
    removeUnknownSubskill(draft, skills);
    removeUnknownArtifact(draft);
    removeUnknownUnit(draft);

    removeWrongCombatOrThaumaturgy(draft, heroes, skills);
    removeWrongSkillsFromSlot1And2(draft, heroes);
    removeDuplicateSkills(draft, heroes, skills);

    ensureNativeSkills(draft, heroes);

    return draft;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function removeUnknownHero(draft) {}

/**
 *
 */
function removeUnknownSkill(draft) {}

/**
 *
 */
function removeUnknownSubskill(draft) {}

/**
 *
 */
function removeUnknownArtifact(draft) {}

/**
 *
 */
function removeUnknownUnit(draft) {}

/**
 *
 */
function removeWrongCombatOrThaumaturgy(draft) {}

/**
 *
 */
function removeWrongSkillsFromSlot1And2(draft) {}

/**
 *
 */
function removeDuplicateSkills(draft) {}

/**
 *
 */
function ensureNativeSkills(draft, heroes) {
    const heroData = heroes[draft.hero];
    if (heroData) {
        const {skills} = heroData;
        if (draft.skill0Id !== skills[0].name) {
            draft.skill0Id = skills[0].name;
            delete draft.skill0Sub1;
            delete draft.skill0Sub2;
        }
        if (skills[1] && draft.skill1Id !== skills[1].name) {
            draft.skill1Id = skills[1].name;
            delete draft.skill1Sub1;
            delete draft.skill1Sub2;
        }
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default sanitize;
