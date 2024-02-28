'use strcit'

let gElCanvas
let gCtx
let gCurrColor = 'black'
let gCurrLine = 0

function onInit(){
    gElCanvas = document.querySelector('.canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize',resizeCanvas)
    renderMeme()
    renderGallery()
    addMouseListeners()
}

function renderMeme(){
    const meme = getMeme()
    let img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => onImageReady(img,meme.lines)
}

function onImageReady(img,txt){
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    drawTxt(txt)
}

function drawTxt(line){
    let heightCounter = 75
    line.forEach((line,idx) => {
        gCtx.textAlign = 'center'
        gCtx.font = `${line.size}px Tahoma`
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, gElCanvas.width/2,heightCounter)
        savePos(line,gElCanvas.width/2,heightCounter)
        if (gCurrLine === idx) markLine(line,gElCanvas.width/2,heightCounter)
        heightCounter += 75
    })
}

function markLine(line,x,y){
    const textWidth = gCtx.measureText(line.txt).width
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.rect(x-textWidth/2,y-line.size,textWidth + 5,line.size+2)
    gCtx.stroke()

}

function savePos(line,x,y){
    const textWidth = gCtx.measureText(line.txt).width
    line.x = x
    line.y = y - line.size/2
    line.width = textWidth
}

function onClick(ev){
    const pos = getEvPos(ev)
    const lineSelectedIdx = checkIfSelected(pos)
    if (lineSelectedIdx === -1) return
        gCurrLine = lineSelectedIdx
        renderMeme()
}

function getEvPos(ev){
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onSwitchLine(){
    const memeLines = getMeme().lines
    gCurrLine++
    if (gCurrLine > memeLines.length - 1) gCurrLine = 0
    renderMeme()
}

function onTextChange(txt){
    setLineTxt(txt,gCurrLine)
    renderMeme()
}

function onSetColor(color){
    gCurrColor = color
    updateColor(color,gCurrLine)
    renderMeme()
}

function onIncreaseFont(){
    increaseFont(gCurrLine)
    renderMeme()
}

function onDecreaseFont(){
    decreaseFont(gCurrLine)
    renderMeme()
}

function downloadAsImg(elLink){
    const imgContent = gElCanvas.toDataURL('image/png')
    elLink.href = imgContent
}

function onGalleryClick(){
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'grid'
}

function onEditorClick(){
    document.querySelector('.editor-container').style.display = 'grid'
    document.querySelector('.gallery-container').style.display = 'none'
}

function resizeCanvas(){
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
    renderMeme()
}

function addMouseListeners(){
    gElCanvas.addEventListener('click', onClick)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}
