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
    if (songs[song]["title"] == currentSong["title"] && songs[song]["artist"] == currentSong["artist"] && isPlaying) {
        return
    }

    console.log("Playing song:", song)
    audioEl.src = songs[song]["file"]
    currentSong = songs[song]
    audioEl.play()
    isPlaying = true
    document.getElementById("nowPlayingTitle").innerHTML = songs[song]["title"]
    document.getElementById("nowPlayingArtist").innerHTML = songs[song]["artist"]
    document.getElementById("nowPlayingAlbumArt").src = songs[song]["albumCover"]
    playerDuration.innerHTML = Math.floor(currentSong["duration"] / 60) + ":" + (Math.floor(currentSong["duration"]) % 60).toString().padStart(2, '0')
    
    // colored play bar, decided to replace this with a cool footer
    // innerPlayBar.style.background = songs[song]["palette"] ? `linear-gradient(90deg, rgb(${songs[song]["palette"][0][0]}, ${songs[song]["palette"][0][1]}, ${songs[song]["palette"][0][2]}) 0%, rgb(${songs[song]["palette"][1][0]}, ${songs[song]["palette"][1][1]}, ${songs[song]["palette"][1][2]}) 100%)` : "white"

    // change page title and favicon to show what is playing
    document.getElementById("pageTitle").innerHTML = `${songs[song]["title"]} - ${songs[song]["artist"]}`
    document.getElementById("pageFavicon").href = songs[song]["albumCover"]

    updateMediaSession()
}

function audioEnded() {
    currentSong = {}
    document.getElementById("nowPlayingTitle").innerHTML = "Title"
    document.getElementById("nowPlayingArtist").innerHTML = "Artist"
    document.getElementById("nowPlayingAlbumArt").src = ""
    isPlaying = false

    nextSong()
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
}
setInterval(update, 1000 / 60)

function setCurrentTime(e) {
    rect = playBar.getBoundingClientRect();
    mouseX = e.clientX
    
    audioEl.currentTime = ((mouseX - rect.left)/playBar.offsetWidth)*currentSong["duration"]
}

function setVolume() {
    audioEl.volume = volumeSlider.value / 100

    // update the look of the slider
    const sliderEl = document.querySelector("#volume")
    const progress = (volumeSlider.value / 100) * 100;
    sliderEl.style.background = `linear-gradient(to right, #fff ${progress}%, #777 ${progress}%)`;
}
setVolume()

audioEl.onpause = function() {
    isPlaying = false
    isPaused = true
    document.getElementById("pauseBtnIcon").src = "icons/play.svg"
}
audioEl.onplay = function() {
    isPlaying = true
    isPaused = false
    document.getElementById("pauseBtnIcon").src = "icons/pause.svg"
}

function nextSong() {
    // play a random song
    playsong(Object.keys(songs)[Math.floor(Math.random() * Object.keys(songs).length)])
}