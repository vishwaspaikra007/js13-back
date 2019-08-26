var images = {};
var player = {};
var playerPositionBeforeCenter = 0;
var playerPositionAfterCenter = 0;
var ctx = document.getElementById('canvas').getContext('2d');
var ctxS = document.getElementById('canvas');
player.x = 10;
player.width = 219*0.5;
player.height  = 375*0.5;
player.xspd = 5;
player.mapSize = 43*130;
player.mapSizeS1 = ctxS.clientWidth;
var frameTime = 30;
var enterStage0 = true;
var enterStage1 = false;
var enterStage2 = false;
var enterStage3 = false;
var enterStage4 = false;
var enterStage5 = false;
var dialogues = [["Your choice doesn't matter","But Destiny","you have 4 choices"],
                ["Save","My Life Please"],
                ["The KEY is inside","Come in if you want it"],
                ["Keep Moving ==>","Forward"],
                ["Press shift to move faster and go back to play game",
                "To enter room press shift + upper Arrow"]];
var controllerText = "controller"; 
var undef = undefined;
images.bg = new Image();
images.bg.src = './img/bg.png';
var block={};
holdGun = false;
pressedCount = 0;
blockReset = function() {
    block.b1 = true;
    block.b2 = true;
    block.b3 = true;
    block.b4 = false;
}
blockReset();
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
    grd.addColorStop(0, 'black');
    grd.addColorStop(0.5, 'white');
    grd.addColorStop(1, 'black');
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
    styleText("blue",defaultPosition,x+2,text,a);
    styleText("white",defaultPosition,x+1,text,a);
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
    } else if(enterStage2==true) {
        stage2();
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
    if(holdGun == true)
        drawGun(x);
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore()
}
stayInBoundary = (StageX,lowerBound,mapSize,map,exist=true) => {
    if(player[StageX] < lowerBound && map=='map')
        player[StageX] = lowerBound;
    if(player[StageX] + player.width >= mapSize && exist == true) {
        player[StageX] = mapSize - player.width;
    }   
}
centerPlay = function(StageX,mapSize,n,text,font) {
    if(player[StageX] + player.width/2 >= ctxS.clientWidth/2 
        && player[StageX] + player.width/2 < mapSize - ctxS.clientWidth/2) {
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
    if(StageX == 's2x')
        drawColoredMap("red");
    else
        drawMap(-x,mapSize);
    if(StageX != "s3x") {
        for(let i=0;i<n;i++) {
        drawDoor(-x,100*(10*i+1));
        drawText(-x,100*(10*i+1)+100,text[i],font);
            if(x==0 && StageX == 'x') {
                playerPositionBeforeCenter = player.x;
            }
        }
    } if(StageX == "s1x") {
        drawBlock();
        drawControlBox();
    }
}
drawBlock = function() {
    ctx.save();
    var grd = ctx.createLinearGradient(0,0,980,0);
    for(let i=0;i<980;i+=100)
        grd.addColorStop(0.1*i/100, (i/100)%2?'white':'grey');
    ctx.fillStyle = grd;
    for(let i=0;i<4;i++) {
        if(block[`b${i+1}`] == true)
            ctx.fillRect(500+40*i,0,30,358);
    }
    ctx.restore();
}
drawControlBox = function() {
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(300,200,50,100);
    ctx.lineWidth = "2";
    ctx.rect(310,210,30,80);
    ctx.font = "10px Georgia";
    ctx.fillStyle = "black";
    for(let i=0;i<controllerText.length;i+=2) {
        ctx.fillText(controllerText.charAt(i),317,220+8*i);
        ctx.fillText(controllerText.charAt(i+1),326,220+8*i);
    }
    ctx.stroke();
    ctx.restore();
}

drawGun = function(xGun) {
    ctx.save();
    let x=800,y=250;
    if(holdGun == true) {
        x=xGun + player.width*2/3;
        y=180;        
    }
    ctx.fillStyle = "black";
    ctx.fillRect(x,y,100,25);
    ctx.fillRect(x+100,y+7.5,20,10);
    ctx.fillRect(x,y+25,25,25);
    ctx.lineWidth = "5";
    ctx.rect(x+25,y+25,30,15);
    ctx.stroke();
    ctx.fillRect(x+30,y+25,6,10);
    ctx.restore();
}

drawColoredMap = function(x) {
    ctx.save();
    ctx.fillStyle = x;
    ctx.fillRect(0,0,980,300);
    ctx.restore();
}