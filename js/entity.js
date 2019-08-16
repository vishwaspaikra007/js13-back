var images = {};
var ctx = document.getElementById('canvas').getContext('2d');

images.bg = new Image();
images.bg.src = '../img/bg.png';

drawMap = function() {
    ctx.drawImage(images.bg, 0, 0, 43, 43, 
        -100, -100, 43*100,43*100 );
}

drawDoor = function() {
    ctx.save();
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(100,100,100,200);
    grd = ctx.createLinearGradient(0.000, 6.000, 300.000, 294.000);
    // Add colors
    grd.addColorStop(0.100, 'grey');
    grd.addColorStop(0.500, 'white');
    grd.addColorStop(0.900, 'grey');
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(110,110,80,50);
    ctx.beginPath();
    ctx.arc(115, 200, 7, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
}

drawText = function() {
    ctx.save();
    var text = "Your choice doesn't matter";
    var text2 = "But Destiny";
    ctx.font = "60px Georgia";
    ctx.fillStyle = "red"
    ctx.fillText(text, 199, 150);
    ctx.fillText(text2, 200, 200);
    ctx.fillStyle = "cyan"
    ctx.fillText(text, 201, 150);
    ctx.fillText(text2, 202, 200);
    ctx.fillStyle = "black"
    ctx.fillText(text, 200, 150);
    ctx.fillText(text2, 201, 200);
    ctx.restore()
}