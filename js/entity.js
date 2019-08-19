var images = {};

var player = {};
var playerPositionBeforeCenter = 0;
var playerPositionAfterCenter = 0;

var ctx = document.getElementById('canvas').getContext('2d');
var ctxS = document.getElementById('canvas');

player.x = 100;
player.width = 219*0.5;
player.height  = 375*0.5;
player.xspd = 5;
player.mapSize = 43*130;
player.mapSizeS1 = ctxS.clientWidth;
var enterStage1 = false;

var choice = "Your choice doesn't matter";
var destiny = "But Destiny";
var moving  = "Keep Moving ==>";
var save = "Save";
var life = "My Life Please";
var key = "The KEY is inside";
var come = "Come in if you want it";
var instruction1 = "Press shift to move faster and go back to play game";
var instruction2 = "To enter room press shift &uarr;";
var dialogues = [["Your choice doesn't matter","But Destiny"],
                ["Save","My Life Please"],
                ["The KEY is inside","Come in if you want it"],
                ["Keep Moving ==>","Forward"],
                ["Press shift to move faster and go back to play game",
                "To enter room press shift + upper Arrow"]];
var undef = undefined;

images.bg = new Image();
images.bg.src = './img/bg.png';

drawMap = function(x=0,mapSize) {
    ctx.drawImage(images.bg, 0, 0, 43, 43, 
        x, -100, mapSize,mapSize );
}

drawDoor = function(x=0,defaultPosition=100) {
    ctx.save();
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(defaultPosition+x,100,100,200);
    grd = ctx.createLinearGradient(0.000, 6.000, 900.000, 300.000);
    // Add colors
    grd.addColorStop(0.100, 'black');
    grd.addColorStop(0.250, 'white');
    grd.addColorStop(0.400, 'grey');
    grd.addColorStop(0.550, 'white');
    grd.addColorStop(0.700, 'white');
    grd.addColorStop(0.850, 'grey');
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
    ctx.fillText(text2, defaultPosition+x, 200);
    ctx.fillStyle = "cyan"
    ctx.fillText(text1, defaultPosition+2+x, 150);
    ctx.fillText(text2, defaultPosition+2+x, 200);
    ctx.fillStyle = "black"
    ctx.fillText(text1, defaultPosition+1+x, 150);
    ctx.fillText(text2, defaultPosition+1+x, 200);
    ctx.restore()
}

drawPlayer = function() {
    if(enterStage1==true) {
        stage1();
    } else {
        stage0();
    }
}

stage0 = function() {
    ctx.save();
    if(player.pressingRight == true)
        player.x+=player.xspd;
    if(player.pressingLeft == true)
        player.x-=player.xspd;
    const x = centerPlay("x",player.mapSize); 
    stayInBoundary("x",player.mapSize);
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore()
}

stayInBoundary = (StageX,mapSize) => {
    if(player[StageX] < 0)
        player[StageX] = 0;
    if(player[StageX] + player.width >= mapSize) {
        player[StageX] = mapSize - player.width;
    }
    
}

centerPlay = function(StageX,mapSize) {
    if(player[StageX] + player.width/2 >= ctxS.clientWidth/2 && player[StageX] + player.width/2 < mapSize - ctxS.clientWidth/2) {
        const x = player[StageX] - playerPositionBeforeCenter;
        mapMovement(x,StageX,mapSize);
        playerPositionAfterCenter = player[StageX];
        return ctxS.clientWidth/2 - player.width/2;
    } else if(player[StageX] + player.width/2 >= mapSize - ctxS.clientWidth/2 && StageX=="x") {
        mapMovement(playerPositionAfterCenter - playerPositionBeforeCenter,StageX,mapSize);
        return player[StageX]-playerPositionAfterCenter + ctxS.clientWidth/2 - player.width/2;
    } else {
        mapMovement(0,StageX,mapSize);
        return player[StageX];
    }
}
mapMovement = function(x,StageX,mapSize) {
    drawMap(-x,mapSize);
    if(StageX == "x") {
        for(let i=0;i<5;i++) {
        drawDoor(-x,100*(10*i+1));
        drawText(-x,100*(10*i+1)+100,dialogues[i][0],dialogues[i][1]);
            if(x==0) {
                playerPositionBeforeCenter = player.x;
            }
        }
    }
}