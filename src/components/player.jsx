//plays pause music

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo},) => {
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
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}
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

        </div>
    );
};

export default Player;
