var frameTime = 30;

var widthOfScreen;

window.onload = function() {
    // widthOfScreen = dataFromBrowser();
    initialConfigOfCanvasSize(widthOfScreen);
}

window.onresize = function() {
    // widthOfScreen = dataFromBrowser();
    initialConfigOfCanvasSize(widthOfScreen);
}

dataFromBrowser = function() {
    let a = document.getElementById('body').clientWidth;
    return a;
}

initialConfigOfCanvasSize = function(x=980) {
    console.log(x);
    var canvas = document.getElementById('canvas');
    canvas.width = x;
    canvas.height = 300;
}