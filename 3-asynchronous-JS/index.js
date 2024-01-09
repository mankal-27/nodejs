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
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data =>{
//     console.log(`Breed : ${data}`)
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
//     .then(res => {
//         console.log(res.body.message)
//         return writeFilePro('dog-img.txt',  res.body.message)
//     })
//     .then(() => {
//         console.log('Random Dog Image Saved')
//     })
//     .catch(err => {
//          console.log(err)
//     });

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed : ${data}`);
        
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        // console.log(all);
        const imgs = all.map(el => el.body.message)
        console.log(imgs);

        await writeFilePro('dog-img.txt',  imgs.join('\n'))
        console.log('Random Dog Image Saved');
    } catch (error) {
        console.log(error);
        throw (error);
    }
    return '2: Ready !'
}

// console.log('1: Will Get Dog Image');
// getDogPic().then((x) => {
//     console.log(x);
//     console.log('3: Done Getting Dog Image');
// }).catch((err) => {
//     console.log('Eroor came noooooo------');
// })

(async() => {
    try {
        console.log('1: Will Get Dog Image');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done Getting Dog Image');
    } catch (error) {
        console.log('Eroor came noooooo------');
    }
})()