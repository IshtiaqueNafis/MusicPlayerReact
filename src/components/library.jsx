import React from 'react';
import LibrarySong from "./librarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ""} `}>


            {songs.map(song => <LibrarySong songs={songs}
                                            setCurrentSong={setCurrentSong}
                                            song={song}
                                            key={song.id}
                                            id={song.id}
                                            audioRef={audioRef}
                                            isPlaying={isPlaying}
                                            setSongs={setSongs}

            />)

            }


        </div>
    );
};

export default Library;
