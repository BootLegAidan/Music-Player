function sortSongs(method="title",reverse=false) {
    miscInfoDisplay = undefined
    switch(method.toLowerCase()) {
        case "artist":
            songs.sort((a, b) => reverse ? b.artist.localeCompare(a.artist) : a.artist.localeCompare(b.artist));
            break;
        case "album":
            songs.sort((a, b) => reverse ? b.album.localeCompare(a.album) : a.album.localeCompare(b.album));
            break;
        case "year":
            songs.sort((a, b) => reverse ? b.year.localeCompare(a.year) : a.year.localeCompare(b.year));
            miscInfoDisplay = "year"
            break;
        case "duration":
            songs.sort((a, b) => reverse ? b.duration - a.duration : a.duration - b.duration);
            miscInfoDisplay = "duration"
            break;
        case "title":
        default:
            songs.sort((a, b) => reverse ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
            break;
    }
    createList("", miscInfoDisplay)
}

function handleSort() {
    sortSettings = document.getElementById("sortSelect").value.split("-")
    sortSongs(sortSettings[0], (sortSettings[1] == "desc"))
    console.log(sortSettings == "desc");
    
}