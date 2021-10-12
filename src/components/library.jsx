import React from 'react';
import LibrarySong from "./librarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying}) => {
    return (
        <div className="library">

            {songs.map(song => <LibrarySong songs={songs}
                                            setCurrentSong={setCurrentSong}
                                            song={song}
                                            key={song.id}
                                            id={song.id}
                                            audioRef={audioRef}
                                            isPlaying={isPlaying}

            />)

            }


        </div>
    );
};

export default Library;
