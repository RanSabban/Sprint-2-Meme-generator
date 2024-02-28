'use strcit'

let gElCanvas
let gCtx

function onInit(){
    gElCanvas = document.querySelector('.canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize',resizeCanvas)
    renderMeme()
}

function renderMeme(){
    let img = new Image()
    img.src = 'img/1.jpg'
    img.onload = () => onImageReady(img)
}

function onImageReady(img){
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    drawTxt()
}

function drawTxt(txt = 'Hello'){
    // gCtx.beginPath()
    gCtx.textAlign = "center"
    gCtx.font = '2em Tahoma'
    gCtx.fillStyle = 'red'
    gCtx.fillText(txt, gElCanvas.width/2,75)
}



function resizeCanvas(){
    const elCanvasContainer = document.querySelector('.editor-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
}

