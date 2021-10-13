import './styles/App.scss'
import Player from "./components/player";
import Song from "./components/song";
import data from './data'
import React, {useRef, useState} from "react";
import Library from "./components/library";
import Nav from "./components/Nav";

const App = () => {
    const audioRef = useRef(null);
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false);
    //region songInfo --> set the songInfo
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })
    //endregion
    const [libraryStatus, setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) => {

        const current = e.target.currentTime; // displays what length current song is playing
        const duration = e.target.duration; // displays how long the song is.
        const roundedCurrent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)
        setSongInfo({
            ...songInfo, // copy the current song info
            currentTime: current,  // set the current time
            duration,
            animationPercentage
        })
    };


    const songHandler = async () => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)

        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if(isPlaying) audioRef.current.play();
    };

    return (

        <div className={`App ${libraryStatus?'library-active':""}`}>
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

            <Song currentSong={currentSong}/>
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying} // this will be whther setisPlaying
                isPlaying={isPlaying} // this will be whether isPlaying current song.
                currentSong={currentSong} // passes current song
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying}
                     setSongs={setSongs} libraryStatus={libraryStatus}/>
            <audio

                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef} src={currentSong.audio}
                onEnded={songHandler}

            />
        </div>

    );
};

export default App;
