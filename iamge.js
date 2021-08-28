const Jimp = require('jimp') ;

async function textOverlay() {
    // Reading image
    const image = await Jimp.read('./img/computer.png');
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    image.print(font, 100, 400, 'All copyrights @https://ww');
    image.print(font, 100, 450, 'asfsagsargrsarg');
    // Writing image after processing
    await image.writeAsync('./processed_img/textOverlay.png');
}

textOverlay();
console.log("Image is processed succesfully")