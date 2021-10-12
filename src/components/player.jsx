//plays pause music

import React, {useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faPlay} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying},) => {
    //ref
    const audioRef = useRef(null);

    const playSongHandler = () => {
        if (isPlaying) {
           audioRef.current.pause(); // if music playing lcikcing on pause will pause ot
            setIsPlaying(!isPlaying) // change it up on or off. if it was false it will be true.
        }else{
            audioRef.current.play(); // if its paused it will play it.
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>Start time</p>
                <input type="Range"/>
                <p>End time</p>
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
                    icon={faPlay}/>
                <FontAwesomeIcon
                    className='skip-forward'
                    size='2x'
                    icon={faAngleRight}/>
            </div>
            <audio ref={audioRef} src={currentSong.audio}/>
        </div>
    );
};

export default Player;
