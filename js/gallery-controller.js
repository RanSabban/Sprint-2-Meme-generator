'use strict'

function renderGallery(){
    renderKeywords()
    const images = getImages()
    let imgsHTML = []
    imgsHTML = images.map(img => {
        return `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.images-container').innerHTML = imgsHTML.join('')
}

function onImgSelect(id){
    onEditorClick()
    setTimeout(() => {
        resetMeme()
        setImg(id)
        onInit()
        renderMeme()    
    },1700)
    
}

function onSetFilterBy(filterBy){
    setFilterBy(filterBy)
    renderGallery()
}

function onClearFilter(){
    setFilterBy('')
    inputSet('')
    renderGallery()
}

function inputSet(str){
    document.querySelector('.filter-gallery').value = str
}

function updateSearch(keyword){
   setFilterBy(keyword) 
   inputSet(keyword)
   renderGallery()
   onIncreaseKeyWord(keyword)
}

function onFlexible(){
    const imageId = getRandomImg().id
    const txt = makeLorem(5)
    createMeme(imageId,txt)
    onEditorClick()
    setTimeout(()=>{
        onInit()
    },1700)}

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
    resetMeme()
    updateImages(id,img)
    // saveUserUploadedImg(id,img)
    setImg(id)
    onEditorClick()
    setTimeout(()=>{
        onInit()
    },1700)}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function renderKeywords(){
    const elKeywords = document.querySelector('.keywords-container')
    const keyWords = getKeywordsMap() 
    let strHTML = ''
    console.log(keyWords);
    for (const keyword in keyWords){
        strHTML += `
        <span class = 'keyword' style="font-size: ${0.5+(0.1*keyWords[keyword])}em;" onclick="updateSearch('${keyword}')">${keyword}</span>`
    }
    elKeywords.innerHTML = strHTML
}

function getKeywordsMap(){
    let mappedImgs = {}
    let images = getImagesWithoutFilters()
    images.map(image => {
        const keywords = image.keyWords
        for (var i = 0; i < keywords.length;i++){
            mappedImgs[keywords[i]] ? mappedImgs[keywords[i]]++ : mappedImgs[keywords[i]] = 1
        }
    })
    return mappedImgs
}

function onIncreaseKeyWord(keyword){
    // let images = getImagesWithoutFilters()
    // images[0].keywords.push(keyword)
    increaseKeyWord(keyword)
    renderKeywords()
}