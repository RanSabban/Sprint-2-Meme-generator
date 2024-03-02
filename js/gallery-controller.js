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
    setImg(id)
    onEditorClick()
    onInit()
}

function onSetFilterBy(filterBy){
    setFilterBy(filterBy)
    renderGallery()
}

function onFlexible(){
    const imageId = getRandomImg().id
    const txt = makeLorem(5)
    createMeme(imageId,txt)
    onEditorClick()
    onInit()
}

function getRandomImg(){
    const images = getImages()
    return images[getRandomIntInclusive(0,images.length-1)]
}

function onImgInput(ev){
    loadImageFromInput(ev,addImg)
}

function loadImageFromInput(ev,onImageReady){
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addImg(img){
    const images = getImages()
    const id = images.length + 1
    updateImages(id,img)
    // saveUserUploadedImg(id,img)
    setImg(id)
    onEditorClick()
    onInit()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}