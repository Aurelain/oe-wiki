import match from '../utils/match.js';
import downloadPage from '../helpers/downloadPage.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getUnits(lang) {
    const overview = await downloadPage('Units_Overview', lang);
    const [table = ''] = match(overview, /<table[\s\S]*?<\/table>/);
    const rows = table.split('</tr>');
    rows.shift(); // remove the header

    const units = {};
    for (let i = 0; i < rows.length; i++) {
        const unit = parseRow(rows[i]);
        if (unit) {
            units[unit.id] = unit;
        }
    }
    return units;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseRow(row) {
    const columns = row.split('</td>');
    const first = columns.shift();

    // id
    let [, id] = match(first, /data-id=['"]([^'"]*)/);
    if (!id) {
        return;
    }
    id = id.replaceAll('&#95;', '_');

    // icon
    const [, icon] = match(first, /([^ ]*) 2x/);
    const [, name] = match(first, /<a.*?>([^< ][^<]+)/);

    // csv
    const segments = [];
    for (const column of columns) {
        let clean = column.replace(/<\/?td.*?>/g, '');
        clean = clean.replace(/<br.*?>/g, ' ');
        segments.push(clean);
    }

    const SPAN = "<span style='white-space:nowrap; margin-right:16px;'>";
    const description = segments.map((content) => SPAN + content + '</span>').join(' ');
    return {id, icon, name, description};
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getUnits;
