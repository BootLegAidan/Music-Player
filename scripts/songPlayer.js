let audioEl = document.createElement("audio")
audioEl.onended = audioEnded
let currentSong = {}
let isPlaying = false
let isPaused = false
let playBar = document.getElementById("playBar")
let innerPlayBar = document.getElementById("playBarProgress")
let volumeSlider = document.getElementById("volume")
let playerTime = document.getElementById("playheadTime")
let playerDuration = document.getElementById("playheadDuration")

function playsong(song) {
    console.log(songs[song]["title"], currentSong["title"], isPlaying);
    if (songs[song]["title"] == currentSong["title"] && songs[song]["artist"] == currentSong["artist"] && isPlaying) {
        return
    }

    console.log("Playing song:", song)
    audioEl.src = songs[song]["file"]
    currentSong = songs[song]
    audioEl.play()
    isPlaying = true
    // playPauseBtn.innerHTML = "pause"
    document.getElementById("nowPlayingTitle").innerHTML = songs[song]["title"]
    document.getElementById("nowPlayingArtist").innerHTML = songs[song]["artist"]
    document.getElementById("nowPlayingAlbumArt").src = songs[song]["albumCover"]
    playerDuration.innerHTML = Math.floor(currentSong["duration"] / 60) + ":" + (Math.floor(currentSong["duration"]) % 60).toString().padStart(2, '0')
    // innerPlayBar.style.background = songs[song]["palette"] ? `linear-gradient(90deg, rgb(${songs[song]["palette"][0][0]}, ${songs[song]["palette"][0][1]}, ${songs[song]["palette"][0][2]}) 0%, rgb(${songs[song]["palette"][1][0]}, ${songs[song]["palette"][1][1]}, ${songs[song]["palette"][1][2]}) 100%)` : "white"

    if (isPaused) {
        pause()
    } else {
        pause()
        pause()
    }
}

function audioEnded() {
    currentSong = {}
    // playPauseBtn.innerHTML = "play_arrow"
    document.getElementById("nowPlayingTitle").innerHTML = "Title"
    document.getElementById("nowPlayingArtist").innerHTML = "Artist"
    document.getElementById("nowPlayingAlbumArt").src = ""
    isPlaying = false

    // play a random song
    playsong(Object.keys(songs)[Math.floor(Math.random() * Object.keys(songs).length)])
}

function update() {
    if (!isPlaying && !isPaused) {
        document.getElementById("nowPlaying").style.display = "none"
    } else {
        document.getElementById("nowPlaying").style.display = ""
    }
    
    innerPlayBar.style.width = (audioEl.currentTime/currentSong["duration"]*100) + "%"
    playerTime.innerHTML = Math.floor(audioEl.currentTime / 60) + ":" + (Math.floor(audioEl.currentTime) % 60).toString().padStart(2, '0')
    drawFooter()
    // playBar.style.border = (audioEl.currentTime/currentSong["duration"]*100) + "px solid red"
    // playBar.innerHTML = (audioEl.currentTime/currentSong["duration"]*100) + "% solid red"
}
setInterval(update, 1000 / 60)

function setCurrentTime(e) {
    rect = playBar.getBoundingClientRect();
    mouseX = e.clientX
    // console.log((mouseX - rect.left)/playBar.offsetWidth);
    
    audioEl.currentTime = ((mouseX - rect.left)/playBar.offsetWidth)*currentSong["duration"]
}

function setVolume() {
    audioEl.volume = volumeSlider.value / 100
    // console.log("Volume set to", audioEl.volume);
}
setVolume()

function pause() {
    pauseIcon = document.getElementById("pauseBtnIcon")
    if (!isPaused) {
        audioEl.pause()
        isPlaying = false
        isPaused = true
        pauseIcon.src = "icons/play.svg"
    } else {
        audioEl.play()
        isPlaying = true
        isPaused = false
        pauseIcon.src = "icons/pause.svg"
    }
}