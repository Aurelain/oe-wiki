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

    removeWrongCombatOrThaumaturgy(draft, heroes);
    removeWrongSkillsFromSlot1And2(draft, heroes);
    removeDuplicateSkills(draft);

    ensureNativeSkills(draft, heroes);

    return draft;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function removeUnknownHero(draft, heroes) {
    const {hero} = draft;
    if (hero && !heroes[hero]) {
        console.warn(`Unknown hero "${draft.hero}" was removed!`);
        delete draft.hero;
    }
}

/**
 *
 */
function removeUnknownSkill(draft, skills) {
    for (let i = 0; i < 8; i++) {
        const key = `skill${i}Id`;
        const skillId = draft[key];
        if (skillId) {
            if (!skills[skillId]) {
                delete draft[key];
                console.warn(`Unknown skill "${skillId}" was removed!`);
            } else if (skills[skillId].subs.length) {
                delete draft[key];
                console.warn(`Non-basic skill "${skillId}" was removed!`);
            }
        }
    }
}

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
function removeWrongCombatOrThaumaturgy(draft, heroes) {
    const {hero} = draft;
    if (hero) {
        const {isMight} = heroes[hero];
        for (let i = 0; i < 8; i++) {
            const key = `skill${i}Id`;
            const skillId = draft[key];
            if (skillId) {
                if (skillId === 'skill_battle_artistry') {
                    if (!isMight) {
                        delete draft[key];
                        console.warn(`Skill "${skillId}" was removed because it's only for Might!`);
                    }
                } else if (skillId === 'skill_wisdom') {
                    if (isMight) {
                        delete draft[key];
                        console.warn(`Skill "${skillId}" was removed because it's only for Magic!`);
                    }
                }
            }
        }
    }
}

/**
 *
 */
function removeWrongSkillsFromSlot1And2(draft, heroes) {
    const {hero} = draft;
    if (hero) {
        const {skills} = heroes[hero];
        for (let i = 0; i < skills.length; i++) {
            const key = `skill${i}Id`;
            const skillId = draft[key];
            if (skillId) {
                if (skillId !== skills[i].name) {
                    delete draft[key];
                    console.warn(`Skill "${skillId}" cannot occupy slot number ${i}!`);
                }
            }
        }
    }
}

/**
 *
 */
function removeDuplicateSkills(draft) {
    const used = {};
    for (let i = 0; i < 8; i++) {
        const key = `skill${i}Id`;
        const skillId = draft[key];
        if (skillId) {
            if (used[skillId]) {
                delete draft[key];
                console.warn(`Duplicate skill "${skillId}" was removed!`);
            } else {
                used[skillId] = true;
            }
        }
    }
}

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
