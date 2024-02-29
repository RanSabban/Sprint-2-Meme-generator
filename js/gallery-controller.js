'use strict'

function renderGallery(){
    const images = getImages()
    let imgsHTML = []
    imgsHTML = images.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.images-container').innerHTML = imgsHTML.join('')
}

function onImgSelect(id){
    onEditorClick()
    setImg(id)
    onInit()
}

function onSetFilterBy(filterBy){
    setFilterBy(filterBy)
    renderGallery()
}