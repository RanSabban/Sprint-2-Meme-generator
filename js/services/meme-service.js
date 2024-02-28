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
        }
    ]
}

var gKeywordSearchCountMap = {'funny': 12, 'politics': 3, 'baby': 2}

function getMeme(){
    return gMeme
}

function setLineTxt(txt){
    gMeme.lines[0].txt = txt
    if (!txt){
        gMeme.lines[0].txt = 'Default'
    }
}

function updateColor(color){
    gMeme.lines[0].color = color
}

function getImages(){
    return gImgs
}

function increaseFont(){
    gMeme.lines[0].size += 2
}

function decreaseFont(){
    gMeme.lines[0].size -= 2
}


function setImg(id){
    const image = findImgById(id)
    gMeme.selectedImgId = image.id
}

function findImgById(id){
    return gImgs.find(image => image.id === id)
}
