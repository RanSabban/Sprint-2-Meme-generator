'use strict'

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny','politics']},
    {id: 2, url: 'img/2.jpg', keywords: ['funny','politics']},
    {id: 3, url: 'img/3.jpg', keywords: ['funny','politics']},
]

var gMeme = {
    selectedImgId: 1, 
    selectedLineIdx: 0, 
    lines: [
        {
            txt: 'I love Falafel',
            size: 20, 
            color: 'blue'
        },
        {
            txt: 'Shawarma',
            size: 30,
            color: 'red'
        }
    ]
    
}

var gKeywordSearchCountMap = {'funny': 12, 'politics': 3, 'baby': 2}

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
    return gImgs
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
        color: 'black'
    })
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