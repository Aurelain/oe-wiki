// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * Fairly and deterministically upgrades numbers across levels based on distribution weights.
 * @param {number[]} bases - Array of 4 initial starting values.
 * @param {number} level - Number of levels/steps (1 to 32).
 * @param {number[]} chances1 - Array of 4 percentages summing to 100 for levels 1-23.
 * @returns {number[]} Deterministically upgraded values.
 */
function upgradeNumbers(bases, level, chances1) {
    const result = [...bases];
    if (level === 1) {
        return result;
    }

    const deltas = [];
    const points = level - 1;
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        deltas[i] = Math.round((points * chances1[i]) / 100);
        sum += deltas[i];
    }

    // Handle overflow:
    const overflow = sum - points;
    if (overflow < 0) {
        const sorted = sortWithIndices(chances1);
        let fixed = 0;
        for (let i = sorted.length - 1; i >= 0; i--) {
            const {index} = sorted[i];
            deltas[index]++;
            fixed++;
            if (fixed === -overflow) {
                break;
            }
        }
    } else if (overflow > 0) {
        const sorted = sortWithIndices(chances1);
        let fixed = 0;
        for (let i = 0; i < sorted.length; i++) {
            const {index} = sorted[i];
            deltas[index]++;
            fixed++;
            if (fixed === overflow) {
                break;
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        result[i] += deltas[i];
    }

    // TODO: maybe accept levels 24+

    return result;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function sortWithIndices(numbers) {
    return numbers.map((value, index) => ({index, value})).sort((a, b) => a.value - b.value);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default upgradeNumbers;
