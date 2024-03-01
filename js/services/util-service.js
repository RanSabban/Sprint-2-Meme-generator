'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function makeLorem(wordCount = 100) {
    let str = ''
    let isNewSentence = true
  
    for (let i = 0; i <= wordCount; i++) {
      if (isNewSentence) {
        str += getWord(true) + ' '
        isNewSentence = false
      } else {
        str += getWord(false) + ' '
        if (!(wordCount % (i + 2))) {
          str += '.\n'
          isNewSentence = true
        }
      }
    }
    return str
  }

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let txt = ''
  
    for (let i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }