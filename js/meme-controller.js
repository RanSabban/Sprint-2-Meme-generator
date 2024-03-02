'use strcit'

let gElCanvas
let gCtx
let gCurrColor = 'black'
let gCurrLine = 0
let gIsGrabbed = false

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit(){
    gElCanvas = document.querySelector('.canvas-editor')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize',resizeCanvas)
    renderMeme()
    // renderGallery()
    addMouseListeners()
    addKeyboardListeners()
    addTouchListeners()
    renderSavedMemes()
}

function renderMeme(){
    const meme = getMeme()
    // const images = getImages()
    const image = findImgById(meme.selectedImgId)
    if (image.isUserUpload){
        var img = new Image()
        img.src = image.img.src
    } else {
        var img = new Image()
        img.src = `img/${meme.selectedImgId}.jpg`
    }
    img.onload = () => onImageReady(img,meme.lines)
}

function onImageReady(img,lines){
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    drawTxt(lines)
}

function drawTxt(lines){
    let heightCounter = 75
    lines.forEach((line,idx) => {
        gCtx.textAlign = 'center'
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        if (gIsGrabbed){
            gCtx.fillText(line.txt,line.x,line.y)
            savePos(line,line.x,line.y)
        } else {
            if (line.align === 'left'){
                const x = gCtx.measureText(line.txt).width/2
                gCtx.fillText(line.txt,x,line.y)
                savePos(line,x,line.y)
            }
            if (line.align === 'center'){
                gCtx.fillText(line.txt,gElCanvas.width/2,line.y)
                savePos(line,gElCanvas.width/2,line.y)
            }
            if (line.align === 'right'){
                const x = gElCanvas.width - gCtx.measureText(line.txt).width/2
                gCtx.fillText(line.txt,x,line.y)
                savePos(line,x,line.y)
            }
            if (line.align === 'released'){
                gCtx.fillText(line.txt,line.x,line.y)
                savePos(line,line.x,line.y)
            }
        }
        if (gCurrLine === idx) markLine(line,line.x,line.y)
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
    // line.y = y - line.size/2
    line.y = y 
    line.width = textWidth
}

function onClick(ev){
    const pos = getEvPos(ev)
    const lineSelectedIdx = checkIfSelected(pos)
    if (lineSelectedIdx === -1) return
    gCurrLine = lineSelectedIdx
    renderMeme()
}

function onDown(ev){
    const pos = getEvPos(ev)
    renderMeme()
    const lineSelectedIdx = checkIfSelected(pos)
    if (lineSelectedIdx === -1) return 
    gCurrLine = lineSelectedIdx
    gIsGrabbed = true
    renderMeme()
}

function onMove(ev){
    if (!gIsGrabbed) return 
    const pos = getEvPos(ev)
    const meme = getMeme()
    const diffX = pos.x - meme.lines[gCurrLine].x
    const diffY = pos.y - meme.lines[gCurrLine].y
    moveText(diffX,diffY,gCurrLine)
    renderMeme()
}

function onUp(){
    gIsGrabbed = false
}

function getEvPos(ev){
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVENTS.includes(ev.type)) {
		ev.preventDefault()         // Prevent triggering the mouse events
		ev = ev.changedTouches[0]   // Gets the first touch point

		// Calc pos according to the touch screen
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}
	}
	return pos
}

function onAddLine(){
    addLine()
    const meme = getMeme()
    gCurrLine = meme.lines.length - 1
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

function onFontSelect(font){
    updateFont(font,gCurrLine)
    renderMeme()
}

function onLeftAligment(){
    leftAligment(gCurrLine)
    renderMeme()
}

function onCenterAligment(){
    centerAligment(gCurrLine)
    renderMeme()
}

function onRightAligment(){
    rightAligment(gCurrLine)
    renderMeme()
}

function onDeleteLine(){
    deleteLine(gCurrLine)
    renderMeme()
}

function downloadAsImg(elLink){
    const imgContent = gElCanvas.toDataURL('image/png')
    elLink.href = imgContent
}

function onGalleryClick(){
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.saved-memes-container').style.display = 'none'
}

function onEditorClick(){
    document.querySelector('.editor-container').style.display = 'grid'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.saved-memes-container').style.display = 'none'
}

function onSavedMemesClick(){
    renderSavedMemes()
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.saved-memes-container').style.display = 'grid'

}

function resizeCanvas(){
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
    renderMeme()
}

function addMouseListeners(){
    gElCanvas.addEventListener('click', onClick)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(){
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchend', onUp)
}

function addKeyboardListeners(){
    document.addEventListener('keydown', onKeyDown)
    
}

function onKeyDown(ev){
    if (ev.key === 'ArrowDown'){
        ev.preventDefault()
        arrowDown(gCurrLine)
        renderMeme()
    }

    if (ev.key === 'ArrowUp'){
        ev.preventDefault()
        arrowUp(gCurrLine)
        renderMeme()
    }
}

function onLoadMeme(id){
    console.log(id);
    const memes = getSavedMemes()
    console.log(memes);
    const meme = memes.find(meme => meme.id === id)
    console.log(meme);
    setLoadedMeme(meme)
    onEditorClick()
    onInit()
    // renderMeme()

}

function onSaveMeme(){
    const id = makeId()
    var imageData = gElCanvas.toDataURL('image/png')
    saveImages(imageData,id)
    saveMemes(id)
    showSuccess()
    // var memeData = getMeme()
    
}

function showSuccess(){
    const elSucc = document.querySelector('.success-msg')
    elSucc.style.display = 'grid'
    setTimeout((()=> elSucc.style.display = 'none'),2000)
}

function renderSavedMemes(){
    const images = getSavedImgs()
    if (!images) return
    let strHTML = []
    strHTML = images.map(image => {
        return `
        <img src="${image.src}" onclick="onLoadMeme('${image.id}')">`
    })
    document.querySelector('.saved-memes-container').innerHTML = strHTML.join('')
}

