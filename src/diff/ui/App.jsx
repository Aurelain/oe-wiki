import {Component, createRef} from 'preact';
import {css} from 'goober';
import addLogLine, {setLogHost} from '../../@shared/addLogLine.js';
import compareArchives from '../compareArchives.js';
import BrowserApi from '../../@shared/BrowserApi.js';
// import parse from '../../parse/parse.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ROOT = css`
    color: #fff;
    & input {
        margin-left: 4px;
    }
`;
const FIELD = css`
    margin-top: 2px;
`;
const OUTPUT = css`
    height: 200px;
`;

// const PARSE = 'http://localhost:8000/parse/parse.js';
const PARSE = 'MediaWiki:ParseCore.js';
// const PARSE = parse;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends Component {
    vars = {
        logRef: createRef(),
    };
    state = {
        version: '0.00.00',
        date: new Date().toISOString().substring(0, 10),
        archiveA: null,
        archiveB: null,
        comparisonResult: '',
        isWorking: false,
    };

    render() {
        const {logRef} = this.vars;
        const {version, date, archiveA, archiveB, comparisonResult, isWorking} = this.state;
        return (
            <div class={ROOT}>
                <div class={FIELD}>
                    Patch version:
                    <input disabled={isWorking} value={version} onChange={this.onVersionChange} />
                </div>
                <div class={FIELD}>
                    Patch date:
                    <input disabled={isWorking} value={date} onChange={this.onDateChange} />
                </div>
                <div class={FIELD}>
                    Archive A (older):
                    <input
                        disabled={isWorking}
                        type="file"
                        value={archiveA ? undefined : ''}
                        onChange={this.onArchiveAChange}
                    />
                </div>
                <div class={FIELD}>
                    Archive B (newer):
                    <input
                        disabled={isWorking}
                        type="file"
                        value={archiveB ? undefined : ''}
                        onChange={this.onArchiveBChange}
                    />
                </div>
                <button
                    disabled={!version || !date || !archiveA || !archiveB || isWorking}
                    onClick={this.onCompareClick}
                >
                    Compare {isWorking && <progress />}
                </button>
                <br />
                <br />
                Log:
                <div ref={logRef} />
                Output:
                <textarea class={OUTPUT} value={comparisonResult}></textarea>
            </div>
        );
    }

    async componentDidMount() {
        const {logRef} = this.vars;
        setLogHost(logRef.current);
        addLogLine('Initialized.');
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onVersionChange = (event) => {
        this.setState({version: event.value});
    };

    /**
     *
     */
    onDateChange = (event) => {
        this.setState({date: event.value});
    };

    /**
     *
     */
    onArchiveAChange = (event) => {
        this.setState({archiveA: event.target.files[0]});
    };

    /**
     *
     */
    onArchiveBChange = (event) => {
        this.setState({archiveB: event.target.files[0]});
    };

    /**
     *
     */
    onCompareClick = async () => {
        const {version, date, archiveA, archiveB} = this.state;
        const patchInfo = {id: version, date: date};
        this.setState({isWorking: true});
        const comparisonResult = await compareArchives(archiveA, archiveB, BrowserApi, PARSE, patchInfo);
        this.setState({
            isWorking: false,
            comparisonResult,
        });
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
