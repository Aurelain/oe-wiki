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

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function log(message, ...args) {
    const type = message.endsWith('!') ? (message.startsWith('!') ? 'error' : 'warning') : 'info';
    add(type, message, args);
}

/**
 * This needs to be called only once, before any `log()` calls.
 */
function setLogHost(element) {
    host = element;
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
export default log;
