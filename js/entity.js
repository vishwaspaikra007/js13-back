var images = {};

var player = {};
var playerPosition = 0;
player.x = 100;
player.width = 219*0.5;
player.height  = 375*0.5;
player.xspd = 5;

var choice = "Your choice doesn't matter";
var destiny = "But Destiny";
var moving  = "Keep Moving";
var undef = undefined;

var ctx = document.getElementById('canvas').getContext('2d');
var ctxS = document.getElementById('canvas');

images.bg = new Image();
images.bg.src = '../img/bg.png';

drawMap = function(x=0) {
    ctx.drawImage(images.bg, 0, 0, 43, 43, 
        x, -100, 43*100,43*100 );
}

drawDoor = function(x=0,defaultPosition=100) {
    ctx.save();
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(defaultPosition+x,100,100,200);
    grd = ctx.createLinearGradient(0.000, 6.000, 300.000, 294.000);
    // Add colors
    grd.addColorStop(0.100, 'grey');
    grd.addColorStop(0.500, 'white');
    grd.addColorStop(0.900, 'grey');
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(defaultPosition+10+x,110,80,50);
    ctx.beginPath();
    ctx.arc(defaultPosition+15+x, 200, 7, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
}

drawText = function(x=0,defaultPosition=199,text1="",text2="") {
    ctx.save();
    ctx.font = "60px Georgia";
    ctx.fillStyle = "red"
    ctx.fillText(text1, defaultPosition+x, 150);
    ctx.fillText(text2, 200+x, 200);
    ctx.fillStyle = "cyan"
    ctx.fillText(text1, defaultPosition+2+x, 150);
    ctx.fillText(text2, 202+x, 200);
    ctx.fillStyle = "black"
    ctx.fillText(text1, defaultPosition+1+x, 150);
    ctx.fillText(text2, 201+x, 200);
    ctx.restore()
}

drawPlayer = function() {
    ctx.save();
    if(player.pressingRight == true)
        player.x+=player.xspd;
    if(player.pressingLeft == true)
        player.x-=player.xspd;
    const x = centerPlay(); 
    stayInBoundary(player)
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore()
}

stayInBoundary = () => {
    if(player.x < 0)
        player.x = 0;
}

centerPlay = function() {
    if(player.x + player.width/2 >= ctxS.clientWidth/2) {
        mapMovement();
        return ctxS.clientWidth/2 - player.width/2;
    } else {
        drawMap();
        for(let i=0;i<5;i++) {
            drawDoor(0,100*(10*i+1));
        }
        drawText(0,undef,choice,destiny);
        playerPosition = player.x;
        return player.x;
    }
}

mapMovement = function() {
    const x = player.x - playerPosition;
    drawMap(-x);
    for(let i=0;i<5;i++) {
        drawDoor(-x,100*(10*i+1));
        if(i>0) {
            drawText(-x,100*(10*i+1)+100,moving);
        } else {
            drawText(-x,100*(10*i+1)+100,choice,destiny);
        }

    }
}