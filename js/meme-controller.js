'use strcit'

let gElCanvas
let gCtx

function onInit(){
    gElCanvas = document.querySelector('.canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize',resizeCanvas)
    renderMeme()
    renderGallery()
}

function renderMeme(){
    const meme = getMeme()
    let img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => onImageReady(img,meme.lines[0].txt)
}

function onImageReady(img,txt){
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    drawTxt(txt)
}

function drawTxt(txt = 'Hello'){
    // gCtx.beginPath()
    gCtx.textAlign = "center"
    gCtx.font = '2em Tahoma'
    gCtx.fillStyle = 'red'
    gCtx.fillText(txt, gElCanvas.width/2,75)
}

function onTextChange(txt){
    setLineTxt(txt)
    renderMeme()
}



function resizeCanvas(){
    const elCanvasContainer = document.querySelector('.editor-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
}

