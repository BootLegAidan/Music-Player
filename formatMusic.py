from mutagen.mp3 import MP3
from mutagen.easyid3 import EasyID3
from mutagen import File
import glob
import json
import time
from colorthief import ColorThief # type: ignore
from io import BytesIO

startTime = time.time()

mp3Files = glob.glob('music/*.mp3', recursive=True)

songList = {}

for file in mp3Files:
    audio = EasyID3(file)
    audioFull = MP3(file)

    title = audio.get('title', ['Unknown Title'])[0]
    artist = audio.get('artist', ['Unknown Artist'])[0]

    songListId = f"{title}-{artist}"
    albumArtPath = "albumArt/"+songListId+".png"

    songList[songListId] = {
        "title": title,
        "artist": artist,
        "album": audio.get('album', ['Unknown Album'])[0],
        "genre": audio.get('genre', ['Unknown Genre'])[0].split(", "),
        "year": audio.get('date', ['Unknown Year'])[0],
        "trackNum": audio.get('tracknumber', ['Unknown Track'])[0],
        "albumCover": albumArtPath,
        "duration": audioFull.info.length,
        "bitrate": audioFull.info.bitrate / 1000,
        "sampleRate": audioFull.info.sample_rate,
        "file": file
    }

    audioFile = File(file)
    if audioFile and "APIC:" in audioFile.tags:
        art = audioFile.tags["APIC:"].data
        with BytesIO(art) as img_bytes:
            palette = ColorThief(img_bytes).get_palette(color_count=4)
            songList[songListId]["palette"] = palette
        with open(albumArtPath, "wb") as img:
            img.write(art)
        hasArt = True
jsonString = json.dumps(songList, indent=4)
print(jsonString)


with open("scripts/data.js", "w") as f:
    f.write(f"let songs = {jsonString};createList();")

print(f"Processed {len(mp3Files)} songs in {(time.time() - startTime):.2f} secongs")