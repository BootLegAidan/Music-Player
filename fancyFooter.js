let fc = document.getElementById("footerC")
let fctx = fc.getContext("2d")
;[fc.width, fc.height] = [window.innerWidth/4, 80/4]
noise.seed(Math.random());

function drawFooter() {
    // console.log(currentSong["palette"]);
    let w = fc.width
    let h = fc.height
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            let n = noise.simplex3(x / 100, y / 100, Date.now() / 5000)
            // normalize noise to 0-1
            n = (n + 1) / 2
            let palette = currentSong["palette"] || [[255,255,255],[0,0,0]]
            let footerColor = palette[Math.floor(n * palette.length)]
            // console.log(color)
            fctx.fillStyle = `rgb(${footerColor[0]}, ${footerColor[1]}, ${footerColor[2]})`
            fctx.fillRect(x, y, 1, 1)
        }
    }
}

