//
global.RootPath = __dirname;
let readlineSync = require('readline-sync');
const os = require("os");
const sharp = require("sharp");
global.RootPath = __dirname;
const TemplateUtil = require(__dirname+'/src/util/TemplateUtil.js');
const ImageUtil = require(__dirname+'/src/util/ImageUtil.js');


let arguments = process.argv;

let list = []
// 可以使用循环迭代所有的命令行参数（包括node路径和文件路径）
arguments.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index != '0' && index != '1') {
        list.push(val);
    }
});


// Wait for user's response.

// let template = readlineSync.question('template1-1（default 1）? ') || "1";
//
// console.log('template = ' + template + '!');
// console.log(list);
//
// // Handle the secret text (e.g. password).
// let confirm = readlineSync.question('Confirm execution? ') || "";
//
// console.log('Oh, ' + template + ' and ' + confirm + '!');

for (let path of list) {

    ImageUtil.getFileMetadata(path).then(tags => {
        // console.log(tags)
        let file = {
            // name: "22.jpg",
            path: path,
            metadata: tags,
        };
        TemplateUtil.getTemp1(file).then(({buff, divHeight}) => {
            console.log({
                width: file.metadata.ImageWidth,
                height: file.metadata.ImageHeight + divHeight,
            })
            sharp({
                create: {
                    width: file.metadata.ImageWidth,
                    height: file.metadata.ImageHeight + divHeight,
                    channels: 3,
                    fastShrinkOnLoad: false,
                    background: {r: 255, g: 255, b: 255, alpha: 1}
                }
            }).composite([
                {input: path, gravity: 'northwest', top: 0, left: 0},
                {input: buff, gravity: 'southeast', top: file.metadata.ImageHeight, left: 0},
            ]).toFile(path + '.combined.jpg').then(r => {
            });
        })
    })

}
