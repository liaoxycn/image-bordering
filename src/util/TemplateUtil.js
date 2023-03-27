const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const lodash = require("lodash");
/**
 *
 *
 *
 *
 */
const getTxt = (path = "") => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, function (err, data) {
                if (!data) {
                    console.log("not find file, path=", path);
                    return;
                }
                resolve(data.toString())
            })
        } catch (e) {
            reject(e);
        }
    })
}

const svgDir = RootPath + "/src/svg/";

const logoTextMap = {
    "sony": ""
}


const loadLogoText = async () => {

    let dir = svgDir + "logos/"
    logoTextMap["apple"] = {
        txt: await getTxt(dir + "apple.svg"),
        ra_height: 0.5,
        ra_left: 2.72,
        ra_top: 0.24,
    }
    logoTextMap["canon"] = {
        txt: await getTxt(dir + "canon.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["fujifilm"] = {
        txt: await getTxt(dir + "fujifilm.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["hasu"] = {
        txt: await getTxt(dir + "hasu.svg"),
        ra_height: 0.5,
        ra_left: 2.72,
        ra_top: 0.27,
    };
    logoTextMap["leica"] = {
        txt: await getTxt(dir + "leica.svg"),
        ra_height: 0.5,
        ra_left: 2.72,
        ra_top: 0.27,
    };
    logoTextMap["lumix"] = {
        txt: await getTxt(dir + "lumix.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["nikon"] = {
        txt: await getTxt(dir + "nikon.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["sony"] = {
        txt: await getTxt(dir + "sony.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["arri"] = {
        txt: await getTxt(dir + "arri.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["audio"] = {
        txt: await getTxt(dir + "audio.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["fotorgear"] = {
        txt: await getTxt(dir + "fotorgear.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["olympus"] = {
        txt: await getTxt(dir + "olympus.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["pentax"] = {
        txt: await getTxt(dir + "pentax.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["ricoh"] = {
        txt: await getTxt(dir + "ricoh.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["sigma"] = {
        txt: await getTxt(dir + "sigma.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["tamron"] = {
        txt: await getTxt(dir + "tamron.svg"),
        ra_height: 0.5,
        ra_left: 3.12,
        ra_top: 0.27,
    };
    logoTextMap["zeiss"] = {
        txt: await getTxt(dir + "zeiss.svg"),
        ra_height: 0.5,
        ra_left: 2.72,
        ra_top: 0.27,
    };

}
loadLogoText();

const getLogo = (make = "", lens = "") => {
    make = make || "";
    lens = lens || "";
    if (!make) {
        if (lens.startsWith("EF")) {
            make = "canon";
        } else if (lens.startsWith("FE")) {
            make = "sony";
        }  else if (lens.includes("FE")) {
            make = "sony";
        } else if (lens.includes("NIKKOR") || /^\w+\s+f\/\d+.\d+Z.*/.test(lens)) {
            make = "nikon";
        } else if (lens.startsWith("GF")) {
            make = "fujifilm";
        }
    }
    let obj = logoTextMap[make] || logoTextMap["leica"];
    return {
        ...obj,
        txt: lodash.clone(obj.txt)
    };
}


const formatDate = (date = {}) => {
    if (date.rawValue) {
        const {year = "", month = "", day = "", hour = "", minute = "", second = ""} = date;
        let tt = `${year}-${(month + "").length == 1 ? "0" + month : month}-${(day + "").length == 1 ? "0" + day : day} ${(hour + "").length == 1 ? "0" + hour : hour}:${(minute + "").length == 1 ? "0" + minute : minute}:${(second + "").length == 1 ? "0" + second : second}`
        tt = tt.replace("::", "");
        return tt;
    }
    return null;
}


const getTemp1 = ({
                      make,
                      name, path,
                      metadata = {}
                  }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let w = metadata.ImageWidth;
            let h = metadata.ImageHeight;
            let xxl = (h / w > 1.5) ? (Math.abs(0 - (w / h)) + 0.33) * 0.8 : 1;
            console.log(`xxl= ${xxl}`)
            // return;
            let maxHeight = (metadata.ImageWidth > metadata.ImageHeight) ?
                metadata.ImageWidth * 0.08542872172540768 : metadata.ImageHeight * 0.10332491582491582 * xxl;
            if (!((maxHeight > 200) || metadata.ImageWidth >= 1000)) {
                console.log("图片过小")
                return;
            }
            let maxHeightInt = parseInt(maxHeight + "")


            let leftSvg = await getTxt(svgDir + "template1/left1.svg");
            let rightSvg = await getTxt(svgDir + "template1/right1.svg");
            //logo
            let logoKey = (metadata.Make || "").replace(" ", "").trim().toLowerCase();
            let {
                txt: sonyLogoSvg,
                ra_height,
                ra_left,
                ra_top
            } = getLogo(logoKey, metadata.LensModel || metadata.LensInfo);
            // console.log({
            //     logoKey, ra_height, ra_left, ra_top
            // })
            //替换字符
            let leftChar;
            let leftBottomChar = "";
            if (metadata.Model || metadata.Make) {
                leftChar = metadata.Model || metadata.Make;
                leftBottomChar = metadata.LensModel || metadata.LensInfo || '--by --';
            } else {
                leftChar = metadata.LensModel || metadata.LensInfo;
            }
            console.debug(`leftChar=` + leftChar)
            if (!leftChar) {
                console.debug("没有设备信息，不处理")
                return;
            }
            leftSvg = leftSvg.replace("ILCE-7RM4", leftChar).replace("--by --", leftBottomChar);
            //
            let len = metadata.FocalLength.replace(" ", "").replace(".0", "") || "00mm";
            let sss = len + " f/" + (metadata.FNumber || "1") + " " + (metadata.ExposureTime || "1/1000") + " ISO " + (metadata.ISO || "100");
            // console.log(sss)
            rightSvg = rightSvg.replace("85mm f/2 1/500 ISO 100", sss || "00mm f/1 1/1000 ISO 100");
            //时间格式
            let tt = formatDate(metadata.CreateDate || metadata.DateTimeOriginal || metadata.FileCreateDate);
            // let tt = metadata.ImageSize || (metadata.ImageWidth+"x"+metadata.ImageHeight);

            rightSvg = rightSvg.replace("2022.08.21 17:01:04", tt || "0000.00.00 00:00:00");
            const leftBuffer = Buffer.from(leftSvg);
            const rightBuffer = Buffer.from(rightSvg);
            const logoBuffer = Buffer.from(sonyLogoSvg);

            let divWidth = metadata.ImageWidth;

            let fa = maxHeight / 100;
            console.log(`当前放大倍数 = ${fa}`)

            console.log({
                logoKey, ra_height, ra_left, ra_top,
                ImageWidth: metadata.ImageWidth,
                ImageHeight: metadata.ImageHeight,
                borderHeight: maxHeight,
                height: parseInt((metadata.ImageHeight + maxHeight) + ""),
            })
            let leftP = {
                width: undefined,
                height: parseInt(maxHeight + ""),
                left: 0,
                top: 0,
            }
            let rightP = {
                width: undefined,
                height: parseInt((maxHeight) + ""),
                left: parseInt((divWidth - (maxHeight * 3) - (divWidth * 0.01)) + ""),
                top: 0,
            }
            let logoP = {
                width: undefined,
                height: parseInt((maxHeight * ra_height) + ""),
                left: parseInt((divWidth - (maxHeight * ra_left) - (divWidth * 0.01)) + ""),
                top: parseInt(((maxHeight * ra_top)) + ""),
            }
            console.debug(`leftP`, leftP)
            console.debug(`rightP`, rightP)
            console.debug(`logoP`, logoP)

            let [data, data2, data3] = await Promise.all([
                new Promise((resolve) => {
                    sharp(rightBuffer).resize(rightP.width, rightP.height, {fastShrinkOnLoad: true}).jpeg({
                        // quality: 90,
                        // chromaSubsampling: '4:4:4'
                    }).toBuffer().then(data => {
                        resolve(data)
                    })
                }),
                new Promise((resolve) => {
                    sharp(logoBuffer).resize(logoP.width, logoP.height, {fastShrinkOnLoad: true}).png({
                        // quality: 90,
                        // chromaSubsampling: '4:4:4'
                    }).toBuffer().then(data => {
                        resolve(data)
                    })
                }),
                new Promise((resolve) => {
                    sharp(leftBuffer).resize(leftP.width, leftP.height, {fastShrinkOnLoad: true}).jpeg({
                        // quality: 90,
                        // chromaSubsampling: '4:4:4'
                    }).toBuffer().then(data => {
                        resolve(data)
                    })
                }),
            ])

            let width = metadata.ImageWidth;
            sharp({
                create: {
                    width: width,
                    height: maxHeightInt,
                    fastShrinkOnLoad: true,
                    channels: 3,
                    background: {r: 255, g: 255, b: 255, alpha: 1}
                }
            }).composite([
                {input: data, top: rightP.top, left: rightP.left},
                {input: data3, top: leftP.top, left: leftP.left},
                {input: data2, top: logoP.top, left: logoP.left},
            ]).jpeg({
                // quality: 90,
                // chromaSubsampling: '4:4:4'
            }).toBuffer().then(data => {
                console.debug(`拼接成功 maxHeight=${maxHeightInt}`)
                resolve({
                    buff: data,
                    divWidth: width,
                    divHeight: maxHeightInt,
                })
                // sharp(data).toFile(path + ".jpg")
            });

        } catch (e) {
            console.error(e)
            reject(e)
        }
    })

}

module.exports = {
    getTemp1,
    getTxt,
}