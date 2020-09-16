
export const evilWizard2IdleImage = new Image();
evilWizard2IdleImage.src = "public/assets/characterSprites/EVil Wizard 2/Idle.png"


export default function sprite (options) {
    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function () {
        that.context.drawImage(
            that.image,
            0,
            0,
            that.width,
            that.height,
            0,
            0,
            that.width,
            that.height);
    };
    return that;
}

// var canvas = document.getElementById("game-area");

// console.log(document.getElementById("game-area"))

// var evilWizard2Idle = sprite({
//     width: 100,
//     height: 100,
//     image: evilWizard2IdleImage
// });
