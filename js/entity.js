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

drawText = function(x=0,defaultPosition=199,text,font="60px Georgia") {
    ctx.save();
    ctx.font = font;
    let a = font.slice(0,2);
    styleText("red",defaultPosition,x,text,a);
    styleText("cyan",defaultPosition,x+2,text,a);
    styleText("black",defaultPosition,x+1,text,a);
    ctx.restore()
}

styleText = function(color,defaultPosition,x,text,a) {
    ctx.fillStyle = color;
    for(let i=0;i<text.length;i++) {
        ctx.fillText(text[i], defaultPosition+x, 150+Number(a)*i);
    }
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
    const x = centerPlay("x",player.mapSize,5,dialogues); 
    stayInBoundary("x",0,player.mapSize,'map');
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore()
}

stayInBoundary = (StageX,lowerBound,mapSize,map) => {
    if(player[StageX] < lowerBound && map=='map')
        player[StageX] = lowerBound;
    if(player[StageX] + player.width >= mapSize) {
        player[StageX] = mapSize - player.width;
    }
    
}

centerPlay = function(StageX,mapSize,n,text,font) {
    if(player[StageX] + player.width/2 >= ctxS.clientWidth/2 && player[StageX] + player.width/2 < mapSize - ctxS.clientWidth/2) {
        const x = player[StageX] - playerPositionBeforeCenter;
        mapMovement(x,StageX,mapSize,n,text,font);
        playerPositionAfterCenter = player[StageX];
        return ctxS.clientWidth/2 - player.width/2;
    } else if(player[StageX] + player.width/2 >= mapSize - ctxS.clientWidth/2 && StageX=="x") {
        mapMovement(playerPositionAfterCenter - playerPositionBeforeCenter,StageX,mapSize,n,text,font);
        return player[StageX]-playerPositionAfterCenter + ctxS.clientWidth/2 - player.width/2;
    } else {
        mapMovement(0,StageX,mapSize,n,text,font);
        return player[StageX];
    }
}
mapMovement = function(x,StageX,mapSize,n=0,text,font) {
    drawMap(-x,mapSize);
    if(StageX == "x" || StageX == "s1x") {
        for(let i=0;i<n;i++) {
        drawDoor(-x,100*(10*i+1));
        drawText(-x,100*(10*i+1)+100,text[i],font);
            if(x==0) {
                playerPositionBeforeCenter = player.x;
            }
        }
    } if(StageX == "s1x") {
        drawBlock();
    }
}

drawBlock = function() {
    ctx.save();
    // a,b,width,angle
    var grd = ctx.createLinearGradient(0,0,980,0);
    // Add colors
    for(let i=0;i<980;i+=100)
        grd.addColorStop(0.1*i/100, (i/100)%2?'white':'grey');
    // Fill with gradient
    ctx.fillStyle = grd;
    for(let i=0;i<4;i++) {
        ctx.fillRect(500+40*i,0,30,358);
    }
    ctx.restore();
}