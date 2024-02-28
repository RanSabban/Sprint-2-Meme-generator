'use strict'


function renderGallery(){
    const images = getImages()
    let imgsHTML = []
    imgsHTML = images.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    imgsHTML.join('')
    document.querySelector('.gallery-container').innerHTML = imgsHTML
}

function onImgSelect(id){
    onEditorClick()
    setImg(id)
    onInit()
}