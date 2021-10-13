export const playAudio = (isPlaying, audioRef ) => {
    if (isPlaying) {

        audioRef.current.play();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(audio => audioRef.current.play)
        }
    }
}