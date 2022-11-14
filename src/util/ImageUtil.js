const {parseJSON, ExifTool} = require("exiftool-vendored")
const sharp = require("sharp");
const TemplateUtil = require("./TemplateUtil");
const exiftool = new ExifTool({taskTimeoutMillis: 3000})

async function getFileMetadata(url = "") {
    console.log("#getFileMetadata  url=" + url)
    try {
        const tags = await exiftool.read(url)
        const str = JSON.stringify(tags)

        const tagsJson = parseJSON(str)
        console.log("======================")
        // console.log(tagsJson)
        console.log("======================")
        return {
            ImageWidth: tagsJson.ImageWidth,//图片宽度
            ImageHeight: tagsJson.ImageHeight,//图片高度
            DateCreated: tagsJson.DateCreated,//图片创建时间
            Make: tagsJson.Make || "",//制造商（如 SONY
            Model: tagsJson.Model || "",//机型（如 ILCE-7RM4
            Lens: tagsJson.Lens || "",//镜头 85mm F1.4 DG DN | Art 020
            //曝光三要素
            ISO: tagsJson.ISO || "",//ISO 100
            FNumber: tagsJson.FNumber || "",//光圈值 2
            ExposureTime: tagsJson.ExposureTime || "",//曝光时间 1/500
            FocalLength: tagsJson.FocalLength || "",//焦距 85mm
            //版权人
            Copyright: tagsJson.Copyright || "",//著作人
            Artist: tagsJson.Artist || "",//艺术家
            ...tagsJson
        }
        // const metadata = await sharp(url).metadata();
        // return metadata;
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}

const coverImage = (path = "", template = "temp1") => {
    return new Promise(async (resolve, reject) => {
        try {
            let tags = await getFileMetadata(path);
            let file = {
                path: path,
                metadata: tags,
            };
            let {buff, divHeight=0} = await TemplateUtil.getTemp1(file);
            console.log({
                divHeight: divHeight,
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
                resolve("ok")
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}

module.exports = {
    getFileMetadata: getFileMetadata,
    coverImage: coverImage,
    close() {
        exiftool.end();
    }
}