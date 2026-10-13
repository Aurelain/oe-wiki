import {Component, createRef} from 'preact';
import {css} from 'goober';
import addLogLine, {setLogHost} from '../../@shared/addLogLine.js';
import to from '../../@shared/to.js';
import checkPermission from '../helpers/checkPermission.js';
import {readFromDb} from '../../setup/utils/LocalDb.js';
import {GAME_DIR_HANDLE} from '../SETTINGS.js';
import {writeToDb} from '../@shared/LocalDb.js';
import parseCore from '../parseCore.js';
import BrowserApi from '../../helpers/BrowserApi.js';
import parse from '../../parse/parse.js';

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

const STATUS_OK = css`
    &:after {
        content: ' ✅';
    }
`;

const STATUS_WARNING = css`
    &:after {
        content: ' ⚠️';
    }
`;

// const PARSE = 'http://localhost:8000/parse/parse.js';
const PARSE = parse;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        logRef: createRef(),
        parsedHub: null,
        mirrorHub: null,
    };
    state = {
        busy: 0,
        hasDirAccess: false,
        isRetrieved: false,
        isPreviewed: false,
        isSaved: false,
    };

    render() {
        const {logRef} = this.vars;
        const {busy, hasDirAccess, isRetrieved, isPreviewed, isSaved} = this.state;
        return (
            <div class={ROOT}>
                <div class={STEP}>
                    <div class={TITLE}>1. Select game data directory</div>
                    <div>
                        Give read-access to the local install directory of the game so the parser can choose what files
                        it needs.
                    </div>
                    <div class={ACTION_BAR}>
                        <button
                            disabled={!!busy}
                            class={hasDirAccess ? STATUS_OK : STATUS_WARNING}
                            onClick={this.onPickDirectoryClick}
                        >
                            Pick directory
                        </button>
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
                        <button
                            disabled={!!busy || !hasDirAccess}
                            class={isRetrieved && STATUS_OK}
                            onClick={this.onRetrieveClick}
                        >
                            Retrieve {busy === 2 && <progress />}
                        </button>
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
                        <button disabled={!!busy || !hasDirAccess || !isRetrieved} class={isPreviewed && STATUS_OK}>
                            Preview {busy === 3 && <progress />}
                        </button>
                    </div>
                </div>
                {/*==== SAVE ===================================*/}
                <div class={STEP}>
                    <div class={TITLE}>4. Save changes</div>
                    <div>
                        Write the changes to each page using the current account, just as if you had done them manually.
                    </div>
                    <div class={ACTION_BAR}>
                        <button disabled={!!busy || !hasDirAccess} class={isSaved && STATUS_OK}>
                            SAVE {busy === 4 && <progress />}
                        </button>
                    </div>
                </div>
                Log:
                <div ref={logRef} />
            </div>
        );
    }

    async componentDidMount() {
        const {logRef} = this.vars;
        setLogHost(logRef.current);
        addLogLine('Initialized.');

        const dirHandle = (this.vars.dirHandle = await readFromDb(GAME_DIR_HANDLE));
        const hasDirAccess = await checkPermission(dirHandle);
        this.setState({
            hasDirAccess,
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onPickDirectoryClick = async () => {
        const {hasDirAccess} = this.state;
        let {dirHandle} = this.vars;
        let needsPicker = false;
        if (!dirHandle) {
            needsPicker = true;
        } else {
            if (hasDirAccess) {
                needsPicker = true;
            } else {
                await dirHandle.requestPermission();
            }
        }

        if (needsPicker) {
            const [freshDirHandle] = await to(window['showDirectoryPicker'], {mode: 'read'});
            dirHandle = this.vars.dirHandle = freshDirHandle;
            await writeToDb(GAME_DIR_HANDLE, dirHandle);
        }
        this.setState({
            hasDirAccess: await checkPermission(dirHandle),
        });
    };

    /**
     *
     */
    onRetrieveClick = async () => {
        await this.ensureParserResult(2);
        // this.setState({
        //     mirrorResult: await retrievePages(state.parserResult),
        // });
    };

    /**
     *
     */
    onPreviewClick = async () => {
        await this.ensureParserResult(3);
    };

    /**
     *
     */
    onSaveClick = async () => {
        await this.ensureParserResult(4);
    };

    /**
     *
     */
    ensureParserResult = async (busy) => {
        if (this.vars.parsedHub) {
            return;
        }
        this.setState({busy});
        this.vars.parsedHub = await parseCore(BrowserApi, PARSE);
        this.setState({busy: 0});
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
