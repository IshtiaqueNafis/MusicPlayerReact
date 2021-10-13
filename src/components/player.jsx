//plays pause music

import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {playAudio} from "../utlis/utlis";


const Player = ({
                    isPlaying,
                    setIsPlaying,
                    audioRef,
                    setSongInfo,
                    songInfo,
                    songs,
                    currentSong,
                    setCurrentSong,
                    setSongs
                }) => {
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

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs)
    }, [currentSong])

    const SkipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if (direction === 'skip-forward') {
          await  setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
            await    setCurrentSong(songs[songs.length - 1])
                if(isPlaying) audioRef.current.play();
                return; // returns it so the code does not break;

            }
         await   setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();

    }


    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value; //sets the current audio value. so it updates when the cursor moves.
        setSongInfo({...songInfo, currentTime: e.target.currentTime});
    }

    //endregion
    const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time & 60)}`).slice(-2)}`

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return (
        <div className='player'>
            <div className="time-control">
                <p>  {getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]}`}}
                     className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}
                           type="Range"/>
                    <div style={trackAnim} className="animate-track">

                    </div>
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon
                    onClick={() => SkipTrackHandler('skip-back')}
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
                    icon={faAngleRight}
                    onClick={() => SkipTrackHandler('skip-forward')}
                />
            </div>

        </div>
    );
};

export default Player;
