import styled from '../utils/styled.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let host;
let table;
const ICONS = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '⛔',
};
const LOG_HOST = 'tool-log';
const CSS = styled`
    .${LOG_HOST} {
        overflow-y: scroll;
        height: 200px;
        flex-shrink: 0;
    }

    .${LOG_HOST} table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    }

    .${LOG_HOST} th {
        text-align: left;
    }

    .${LOG_HOST} th,
    .${LOG_HOST} td {
        border: solid 1px rgba(255, 255, 255, 0.1);
        border-left: none;
        border-right: none;
        vertical-align: top;
        padding: 4px;
    }

    .${LOG_HOST} th {
        border-top: none;
    }

    .${LOG_HOST} table {
        border: solid 1px rgba(255, 255, 255, 0.1);
    }

    .${LOG_HOST} th {
        background: rgba(255, 255, 255, 0.1);
    }

    .${LOG_HOST} td:nth-child(1) {
        width: 90px;
    }

    .${LOG_HOST} td:nth-child(2),
    .${LOG_HOST} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    .${LOG_HOST} td > div > div {
        cursor: pointer;
        color: yellow;
    }

    .${LOG_HOST} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function addLogLine(message, ...args) {
    const type = message.endsWith('!') ? (message.startsWith('!') ? 'error' : 'warning') : 'info';
    add(type, message, args);
}

/**
 * This needs to be called only once, before any `log()` calls.
 */
function setLogHost(element) {
    host = element;
    host.classList.add(LOG_HOST);
    host.innerHTML = `
        <style>${CSS}</style>
        <table class='wikitable'>
            <tr>
                <th>Timestamp</th>
                <th>🆗</th>
                <th>Message</th>
            </tr>
        </table>`;
    table = host.querySelector('table');
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function add(type, message, args) {
    const now = new Date();
    const localTimeISO = now.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
    });

    const row = document.createElement('tr');
    addCell(row, localTimeISO);
    addCell(row, ICONS[type]);
    addCell(row, buildMessage(message, args));

    table.appendChild(row);
    host.scrollTo({
        top: host.scrollHeight,
        behavior: 'smooth',
    });
}

/**
 *
 */
function addCell(row, content) {
    const td = document.createElement('td');
    content = content instanceof Node ? content : document.createTextNode(content);
    td.appendChild(content);
    row.appendChild(td);
}

/**
 *
 */
function buildMessage(message, args) {
    message = message.replace(/^!/, '');
    console.log(message, ...args);
    if (!args.length) {
        return document.createTextNode(message);
    }
    const div = document.createElement('div');

    const msg = document.createElement('div');
    msg.innerHTML = message;
    msg.onclick = function () {
        const isVisible = this.nextElementSibling.style.display !== 'none';
        this.nextElementSibling.style.display = isVisible ? 'none' : 'block';
    };
    div.appendChild(msg);

    const textarea = document.createElement('textarea');
    textarea.style.display = 'none';
    textarea.innerHTML = stringifyArgs(args);
    div.appendChild(textarea);

    return div;
}

/**
 *
 */
function stringifyArgs(args) {
    const lines = [];
    for (const arg of args) {
        if (typeof arg === 'object' && arg) {
            if (arg instanceof Error) {
                lines.push(arg.stack);
            } else {
                lines.push(JSON.stringify(arg, null, 4));
            }
        } else {
            lines.push(arg);
        }
    }
    return lines.join('\n');
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {setLogHost};
export default addLogLine;
