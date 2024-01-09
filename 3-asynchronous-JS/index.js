const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) return reject('I could not find file');
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err=>{
            if(err) return reject('I could not write file');
            resolve('File Written Successfully'); 
        })
    })
}
readFilePro(`${__dirname}/dog.txt`)
    .then(data =>{
    console.log(`Breed : ${data}`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
    .then(res => {
        console.log(res.body.message)
        return writeFilePro('dog-img.txt',  res.body.message)
    })
    .then(() => {
        console.log('Random Dog Image Saved')
    })
    .catch(err => {
        if(err) return console.log(err.message)
    });
