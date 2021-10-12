import './styles/App.scss'
import Player from "./components/player";
import Song from "./components/song";
import data from './utlis'
import {useState} from "react";

const App = () => {
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    return (

        <div className="App">
            <h1> Music </h1>
            <Song currentSong={currentSong}/>
            <Player/>

        </div>
    );
};

export default App;
