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
    console.log(message, ...args);
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
    textarea.innerHTML = JSON.stringify(args, null, 4);
    div.appendChild(textarea);

    return div;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {setLogHost};
export default log;
