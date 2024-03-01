'use strict'

var gImgs 
const MEMES_KEY = 'memesDB'
const IMGS_KEY = 'imgsDB'
var gMemesDB = []
var gImgsDB = []

var gMeme = {
    selectedImgId: 1, 
    selectedLineIdx: 0, 
    lines: [
        {
            txt: 'I love Falafel',
            size: 20, 
            color: 'black',
            font: 'Impact',
            align: 'center',
        },
        {
            txt: 'Shawarma',
            size: 30,
            color: 'black',
            font: 'Impact',
            align: 'center',
        }
    ]
    
}

var gKeywordSearchCountMap = {'funny': 12, 'politics': 3, 'baby': 2}
var gKeyWords = ['funny','politics','actors','toys','serious']
let gFilterBy = ''

function getMeme(){
    return gMeme
}

function setLineTxt(txt,lineSelected){
    gMeme.lines[lineSelected].txt = txt
    if (!txt){
        gMeme.lines[0].txt = 'Default'
    }
}

function updateColor(color,lineSelected){
    gMeme.lines[lineSelected].color = color
}

function getImages(){
    if (!gImgs){
        __createImgs()
    }
    
    const images = gImgs.filter((image) => filterByCheck(image))
    return images
}

function filterByCheck(image){
    for (var i = 0; i < image.keyWords.length;i++){
        if (image.keyWords[i].toLowerCase().includes(gFilterBy.toLowerCase())){
            return true
        }
    }
    return false
}

function setFilterBy(filterBy){
    gFilterBy = filterBy
}

function generateKeywords(){
    var keyWords = []
    for (var i = 0; i < 2; i++){
        keyWords.push(gKeyWords[getRandomIntInclusive(0,4)])
    }
    return keyWords
}

function __createImgs(){
    var images = []
    for (var i = 0; i < 18; i++){
        images.push ({
            id: i+1,
            url: `img/${i+1}.jpg`,
            keyWords: generateKeywords()
        })
    }
    gImgs = images
}

function increaseFont(lineSelected){
    gMeme.lines[lineSelected].size += 2
}

function decreaseFont(lineSelected){
    gMeme.lines[lineSelected].size -= 2
}


function setImg(id){
    const image = findImgById(id)
    gMeme.selectedImgId = image.id
}

function findImgById(id){
    return gImgs.find(image => image.id === id)
}

function addLine(){
    gMeme.lines.push({
        txt: '',
        size: 20,
        color: 'black',
        font: 'Impact',
        align: 'center',
    })
}

function updateFont(font,lineSelected){
    gMeme.lines[lineSelected].font = font
}

function checkIfSelected(pos){
    var selectedLineIdx = -1
    gMeme.lines.forEach((line,idx) => {
        let diffX = Math.abs(pos.x - line.x)
        let diffY = Math.abs(pos.y - line.y)
        if (diffX <= line.width/2 && diffY <= line.size/2){
            selectedLineIdx = idx
        }
    })
    return selectedLineIdx
}

function leftAligment(lineSelected){
    gMeme.lines[lineSelected].align = 'left'
}

function centerAligment(lineSelected){
    gMeme.lines[lineSelected].align = 'center'
}

function rightAligment(lineSelected){
    gMeme.lines[lineSelected].align = 'right'
}

function setLoadedMeme(meme){
    gMeme = meme
}

function getSavedImgs(){
    const savedImgs = loadFromStorage(IMGS_KEY)
    return savedImgs
}

function getSavedMemes(){
    const savedMemes = loadFromStorage(MEMES_KEY)
    return savedMemes
}

function saveMemes(id){
    const meme = gMeme
    meme.id = id
    gMemesDB.push(meme)
    saveToStorage(MEMES_KEY,gMemesDB)
}

function saveImages(imageData,id){
    gImgsDB = loadFromStorage(IMGS_KEY)
    if (!gImgsDB) gImgsDB = []
    gImgsDB.push({id: id,src: imageData})
    saveToStorage(IMGS_KEY,gImgsDB)
}