import React from 'react';
import LibrarySong from "./librarySong";

const Library = ({songs}) => {
    return (
        <div className="library">

            {songs.map(song=> <LibrarySong song={song}/>)}


        </div>
    );
};

export default Library;
