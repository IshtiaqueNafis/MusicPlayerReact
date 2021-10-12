import './styles/App.scss'
import Player from "./components/player";
import Song from "./components/song";

const App = () => (
    <div className="App">
        <h1> Music </h1>
        <Song/>
        <Player/>

    </div>
);

export default App;
