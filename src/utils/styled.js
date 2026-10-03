/**
 * Convinces Webstorm to apply pretty formatting to css strings. Also removes comments.
 * Usage: styled`div {font-weight:bold}`
 */
function styled(strings, ...values) {
    // Restore the whole string:
    const parts = [];
    const {length} = strings;
    for (let i = 0; i < length; i++) {
        parts.push(strings[i], values[i]);
    }
    parts.pop();
    let output = parts.join('');

    // Remove comments:
    output = output.replaceAll(/\/\*[\s\S]*?\*\//g, ''); // block comments
    output = output.replaceAll(/\s\/\/.*/g, ''); // line comments

    return output;
}

export default styled;
