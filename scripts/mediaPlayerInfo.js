function updateMediaSession() {
    if ("mediaSession" in navigator) {
        
        albumCoverURL = new URL(currentSong["albumCover"], window.location.href).href
        
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSong["title"] || "Unknown Title",
            artist: currentSong["artist"] || "Unknown Artist",
            album: currentSong["album"] || "Unknown Album",
            artwork: [
                { src: albumCoverURL, type: "image/png", sizes: "512x512" }
            ]
        });
        
        navigator.mediaSession.setActionHandler("play", () => audioEl.play());
        navigator.mediaSession.setActionHandler("pause", () => audioEl.pause());
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
            audioEl.currentTime = Math.max(audioEl.currentTime - (details.seekOffset || 10), 0);
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
            audio.currentTime = Math.min(audio.currentTime + (details.seekOffset || 10), audio.duration);
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
            // no previous track yet
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
            nextSong()
        });
    }
}