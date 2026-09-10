import {Component} from 'preact';

class App extends Component {
    state = {count: 0};

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>+1</button>
            </div>
        );
    }

    increment = () => {
        this.setState({count: this.state.count + 1});
    };
}

export default App;
