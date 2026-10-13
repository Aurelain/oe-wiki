import {Component, createRef} from 'preact';
import {css} from 'goober';
import addLogLine, {setLogHost} from '../../@shared/addLogLine.js';
import to from '../../@shared/to.js';
import {readFromDb, writeToDb} from '../@shared/LocalDb.js';
import {GAME_DIR_HANDLE} from '../SETTINGS.js';
import parseCore from '../parseCore.js';
import parse from '../../parse/parse.js';
import BrowserApi from '../../helpers/BrowserApi.js';
import checkPermission from '../helpers/checkPermission.js';
import retrievePages from '../helpers/retrievePages.js';
import {applySettings} from '../helpers/ask.js';
import openPopup from '../popup/openPopup.js';
import savePages from '../helpers/savePages.js';

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
        dirHandle: null,
    };
    state = {
        busy: 0,
        hasDirAccess: false,
        parsedHub: null,
        mirrorHub: null,
        isPreviewed: false,
        isSaved: false,
    };

    render() {
        const {logRef} = this.vars;
        const {busy, hasDirAccess, isPreviewed, isSaved, mirrorHub} = this.state;
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
                            class={mirrorHub && STATUS_OK}
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
                        <button
                            disabled={!!busy || !hasDirAccess || !mirrorHub}
                            class={isPreviewed && STATUS_OK}
                            onClick={this.onPreviewClick}
                        >
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
                        <button
                            disabled={!!busy || !hasDirAccess}
                            class={isSaved && STATUS_OK}
                            onClick={this.onSaveClick}
                        >
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

        applySettings({
            API_URL: document.location.href.replace(/[^\/]*$/, '') + 'api.php',
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onPickDirectoryClick = async () => {
        let {hasDirAccess} = this.state;
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
        hasDirAccess = await checkPermission(dirHandle);
        if (!hasDirAccess) {
            this.setState({
                parsedHub: null,
                mirrorHub: null,
                isPreviewed: false,
                isSaved: false,
            });
        }
        this.setState({hasDirAccess});
    };

    /**
     *
     */
    onRetrieveClick = async () => {
        await this.ensureParsedHub(2);
        const mirrorHub = await retrievePages(this.state.parsedHub);
        this.setState({mirrorHub});
    };

    /**
     *
     */
    onPreviewClick = async () => {
        await this.ensureParsedHub(3);
        const {mirrorHub, parsedHub} = this.state;
        openPopup(mirrorHub, parsedHub);
        this.setState({isPreviewed: true});
    };

    /**
     *
     */
    onSaveClick = async () => {
        await this.ensureParsedHub(4);
        const {mirrorHub, parsedHub} = this.state;
        this.setState({busy: 4});
        const isSaved = await savePages(parsedHub, mirrorHub);
        this.setState({
            busy: 0,
            isSaved,
        });
    };

    /**
     *
     */
    ensureParsedHub = async (busy) => {
        if (this.state.parsedHub) {
            return;
        }
        this.setState({busy});
        BrowserApi.setDirHandle(this.vars.dirHandle);
        this.setState({
            busy: 0,
            parsedHub: await parseCore(BrowserApi, PARSE),
        });
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
