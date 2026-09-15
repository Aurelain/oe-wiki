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

    ensureNativeSkills(draft, heroes);
    removeWrongCombatOrThaumaturgy(draft, heroes);
    removeDuplicateSkills(draft);

    removeUnexpectedSubskills(draft);

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
function removeUnknownSubskill(draft, skills) {
    for (let i = 0; i < 8; i++) {
        const skillKey = `skill${i}Id`;
        const skillId = draft[skillKey];

        const sub1Key = `skill${i}Sub1`;
        const sub1Index = draft[sub1Key];

        const sub2Key = `skill${i}Sub2`;
        const sub2Index = draft[sub2Key];

        if (skillId) {
            if (sub1Index !== undefined) {
                const advancedSubs = skills[skillId + '_2']?.subs || [];
                if (sub1Index >= advancedSubs.length) {
                    delete draft[sub1Key];
                    console.warn(`Out-of-bounds Advanced subskill was removed!`);
                }
            }
            if (sub2Index !== undefined) {
                const expertSubs = skills[skillId + '_3']?.subs || [];
                if (sub2Index >= expertSubs.length) {
                    delete draft[sub2Key];
                    console.warn(`Out-of-bounds Expert subskill was removed!`);
                }
            }
        }
    }
}

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
function removeUnexpectedSubskills(draft) {
    for (let i = 0; i < 8; i++) {
        const skillKey = `skill${i}Id`;
        const skillId = draft[skillKey];

        const sub1Key = `skill${i}Sub1`;
        const sub1Index = draft[sub1Key];

        const sub2Key = `skill${i}Sub2`;
        const sub2Index = draft[sub2Key];

        if (!skillId) {
            if (sub1Index !== undefined) {
                delete draft[sub1Key];
                console.warn(`Unexpected Advanced subskill was removed!`);
            }
            if (sub2Index !== undefined) {
                delete draft[sub2Key];
                console.warn(`Unexpected Expert subskill was removed!`);
            }
        } else {
            if (sub1Index === undefined && sub2Index !== undefined) {
                delete draft[sub2Key];
                console.warn(`Unsupported Expert subskill was removed!`);
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
