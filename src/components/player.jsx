//plays pause music

import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying},) => {
    //region audioRef for playing
    const audioRef = useRef(null);
    //endregion

    //region playSongHandler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause(); // if music playing lcikcing on pause will pause ot
            setIsPlaying(!isPlaying) // change it up on or off. if it was false it will be true.
        } else {
            audioRef.current.play(); // if its paused it will play it.
            setIsPlaying(!isPlaying);
        }
    }
    //endregion

    //region songInfo --> set the songInfo
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })
    //endregion
//region
    const timeUpdateHandler = (e) => {

        const current = e.target.currentTime; // displays what length current song is playing
        const duration = e.target.duration; // displays how long the song is.
        setSongInfo({
            ...songInfo, // copy the current song info
            currentTime: current,  // set the current time
            duration
        })
    };

    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value; //sets the current audio value. so it updates when the cursor moves.
        setSongInfo({...songInfo, currentTime: e.target.currentTime});
    }

    //endregion
    const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time & 60)}`).slice(-2)}`


    return (
        <div className='player'>
            <div className="time-control">
                <p>  {getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler}
                       type="Range"/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon
                    className='skip-back'
                    size='2x'
                    icon={faAngleLeft}/>
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='2x'
                    icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon
                    className='skip-forward'
                    size='2x'
                    icon={faAngleRight}/>
            </div>
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
        </div>
    );
};

export default Player;
