import './styles/App.scss'
import Player from "./components/player";
import Song from "./components/song";
import data from './utlis'
import {useState} from "react";
import Library from "./components/library";

const App = () => {
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false);

    return (

        <div className="App">
            <h1> Music </h1>
            <Song currentSong={currentSong}/>
            <Player setIsPlaying={setIsPlaying} // this will be whther setisPlaying
                    isPlaying={isPlaying} // this will be whether isPlaying current song.
                    currentSong={currentSong} // passes current song
            />
    <Library songs={songs}/>
        </div>
    );
};

export default App;
