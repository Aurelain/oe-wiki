import {Component, createRef} from 'preact';
import {css} from 'goober';
import addLogLine, {setLogHost} from '../../@shared/addLogLine.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    color: #fff;
`;

const STEP = css`
    padding: 16px;
    border-top: solid 1px #cbced1;
    &:first-child {
        border: none;
    }
`;

const TITLE = css`
    font-size: 150%;
    font-weight: bold;
    color: #c8b36c;
`;

const ACTION_BAR = css`
    margin-top: 8px;
`;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        logRef: createRef(),
    };
    state = {
        busy: 0,
    };
    render() {
        const {logRef} = this.vars;
        const {busy} = this.state;
        return (
            <div class={ROOT}>
                <div class={STEP}>
                    <div class={TITLE}>1. Select game data directory</div>
                    <div>
                        Give read-access to the local install directory of the game so the parser can choose what files
                        it needs.
                    </div>
                    <div class={ACTION_BAR}>
                        <button disabled={!!busy}>Pick directory</button>
                    </div>
                </div>
                {/*==== RETRIEVE ===================================*/}
                <div class={STEP}>
                    <div class={TITLE}>2. Retrieve wiki data pages</div>
                    <div>
                        Temporarily download all relevant data pages from this wiki so they can be used as a comparison
                        base. <br />
                        This step is optional, but recommended, because it gives awareness in the following steps and
                        reduces the number of updates needed.
                    </div>
                    <div class={ACTION_BAR}>
                        <button disabled={!!busy}>Retrieve {busy === 2 && <progress />}</button>
                    </div>
                </div>
                {/*==== PREVIEW ===================================*/}
                <div class={STEP}>
                    <div class={TITLE}>3. Preview changes</div>
                    <div>
                        Open a popup window listing each page that is about to be updated, potentially highlighting
                        differences.
                    </div>
                    <div class={ACTION_BAR}>
                        <button disabled={!!busy}>Preview {busy === 3 && <progress />}</button>
                    </div>
                </div>
                {/*==== SAVE ===================================*/}
                <div class={STEP}>
                    <div class={TITLE}>4. Save changes</div>
                    <div>
                        Write the changes to each page using the current account, just as if you had done them manually.
                    </div>
                    <div class={ACTION_BAR}>
                        <button disabled={!!busy}>SAVE {busy === 4 && <progress />}</button>
                    </div>
                </div>
                Log:
                <div ref={logRef} />
            </div>
        );
    }

    componentDidMount() {
        const {logRef} = this.vars;
        setLogHost(logRef.current);
        addLogLine('Initialized.');
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
