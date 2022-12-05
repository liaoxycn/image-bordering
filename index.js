//
global.RootPath = __dirname;
const sharp = require("sharp");
const TemplateUtil = require('./src/util/TemplateUtil.js');
const ImageUtil = require('./src/util/ImageUtil.js');
const fs = require("fs");


let arguments = process.argv;

let imagePaths = []
// 可以使用循环迭代所有的命令行参数（包括node路径和文件路径）
// 从命令行中读取图片列表路径
arguments.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index != '0' && index != '1') {
        imagePaths.push(val);
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

//代码添加图片列表路径
// imagePaths.push("D:\\Pictures\\A7R4\\20221204\\jpg\\DSC09354-x1-[16.14].jpg");
// imagePaths.push("D:\\Pictures\\A7R4\\20221114\\jpg\\20221114_PixCake\\DSC08423-x1-[16.30].jpg");

//
let taskList = []
for (let path of imagePaths) {

    taskList.push(ImageUtil.coverImage(path, "temp1"))

}

Promise.all(taskList).finally(() => ImageUtil.close())
