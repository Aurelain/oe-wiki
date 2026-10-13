const LOCALES = ['zh', 'ja', 'ko', 'en'];
const BEGIN = '❮';
const SEPARATOR = '▸';
const END = '❯';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 * Mainly written by Gemini 3.8 Flash.
 */
function compareValue(a, b) {
    if (a === undefined && b === undefined) return '';
    if (a === undefined) return wrap('', b);
    if (b === undefined) return wrap(a, '');

    const seg = new Intl.Segmenter(LOCALES, {granularity: 'word'});
    const A = Array.from(seg.segment(a), (s) => s.segment);
    const B = Array.from(seg.segment(b), (s) => s.segment);
    const m = A.length,
        n = B.length;

    // Flat DP table: index = i * (n + 1) + j
    const dp = new Int32Array((m + 1) * (n + 1));
    const idx = (i, j) => i * (n + 1) + j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[idx(i, j)] =
                A[i - 1] === B[j - 1] ? dp[idx(i - 1, j - 1)] + 1 : Math.max(dp[idx(i - 1, j)], dp[idx(i, j - 1)]);
        }
    }

    // Backtrack edits
    let i = m,
        j = n;
    const ops = [];
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && A[i - 1] === B[j - 1]) {
            ops.push({type: 'eq', val: A[i - 1]});
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[idx(i, j - 1)] >= dp[idx(i - 1, j)])) {
            ops.push({type: 'add', val: B[j - 1]});
            j--;
        } else {
            ops.push({type: 'del', val: A[i - 1]});
            i--;
        }
    }
    ops.reverse();

    // Group adjacent modifications
    let out = '',
        del = '',
        add = '';
    const flush = () => {
        if (del || add) {
            out += wrap(del, add);
            del = '';
            add = '';
        }
    };

    for (const op of ops) {
        if (op.type === 'eq') {
            flush();
            out += op.val;
        } else if (op.type === 'del') {
            del += op.val;
        } else if (op.type === 'add') {
            add += op.val;
        }
    }
    flush();

    return out;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function wrap(a, b) {
    return BEGIN + a + SEPARATOR + b + END;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareValue;
