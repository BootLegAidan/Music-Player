function createList(filter="", miscInfo="duration") {
    songListEl = document.getElementById("songList")
    
    
    songListEl.innerHTML = ""
    for (let [id, data] of Object.entries(songs)) {
        let filterOut = true
        for (let i of Object.values(data)) {
            if ((i).toString().toLowerCase().includes(filter.toLowerCase())) {
                filterOut = false
            }
        }
        if (!filterOut) {
            listItem = document.createElement("span")
            listItem.classList.add("songItem")
            listItem.onclick = function() {playsong(id)}
            
            albumArtDiv = document.createElement("div")
            albumArtDiv.classList.add("albumArtDiv")
            albumArt = document.createElement("img")
            albumArt.src = data["albumCover"]
            albumArt.classList.add("albumCover")
            albumArtDiv.appendChild(albumArt)
            listItem.appendChild(albumArtDiv)
            
            titleDiv = document.createElement("div")
            titleDiv.classList.add("titleDiv")
            title = document.createElement("p")
            title.innerHTML = data["title"]
            titleDiv.appendChild(title)
            listItem.appendChild(titleDiv)

            artistDiv = document.createElement("div")
            artistDiv.classList.add("artistDiv")
            artist = document.createElement("p")
            artist.innerHTML = data["artist"]
            artistDiv.appendChild(artist)
            listItem.appendChild(artistDiv)

            albumDiv = document.createElement("div")
            albumDiv.classList.add("albumDiv")
            album = document.createElement("p")
            album.innerHTML = data["album"]
            albumDiv.appendChild(album)
            listItem.appendChild(albumDiv)

            miscInfoDiv = document.createElement("div")
            miscInfoDiv.classList.add("miscInfoDiv")
            duration = document.createElement("p")
            switch(miscInfo) {
                case "year":
                    duration.innerHTML = data["year"]
                    break;
                case "duration":
                default:
                    duration.innerHTML = Math.floor(data["duration"] / 60) + ":" + (Math.floor(data["duration"]) % 60).toString().padStart(2, '0')
                    break;
            }
            miscInfoDiv.appendChild(duration)
            listItem.appendChild(miscInfoDiv)

            songListEl.appendChild(listItem)
        }
    }
}

function handleSearch() {
    createList(document.getElementById("songSearchbox").value)
}

