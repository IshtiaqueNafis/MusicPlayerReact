import './styles/App.scss'
import Player from "./components/player";
import Song from "./components/song";
import data from './utlis'
import React, {useRef, useState} from "react";
import Library from "./components/library";

const App = () => {
    const audioRef = useRef(null);
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false);
    //region songInfo --> set the songInfo
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })
    //endregion


    const timeUpdateHandler = (e) => {

        const current = e.target.currentTime; // displays what length current song is playing
        const duration = e.target.duration; // displays how long the song is.
        setSongInfo({
            ...songInfo, // copy the current song info
            currentTime: current,  // set the current time
            duration
        })
    };
    return (

        <div className="App">
            <h1> Music </h1>
            <Song currentSong={currentSong}/>
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying} // this will be whther setisPlaying
                isPlaying={isPlaying} // this will be whether isPlaying current song.
                currentSong={currentSong} // passes current song
                setSongInfo={setSongInfo}
                songInfo={songInfo}
            />
            <Library  audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying}/>
            <audio

                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
        </div>

    );
};

export default App;
