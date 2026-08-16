import {STATUS_OK, STATUS_PROGRESS, STATUS_WARNING} from '../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function setButtonStatus(btn, status) {
    btn.classList.toggle(STATUS_OK, status === STATUS_OK);
    btn.classList.toggle(STATUS_WARNING, status === STATUS_WARNING);
    btn.classList.toggle(STATUS_PROGRESS, status === STATUS_PROGRESS);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setButtonStatus;
