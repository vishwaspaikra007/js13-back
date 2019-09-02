var images = {};
var player = {};
var bulletlist = {};
var playerPositionBeforeCenter = 0;
var playerPositionAfterCenter = 0;
var ctx = document.getElementById('canvas').getContext('2d');
var ctxS = document.getElementById('canvas');
player.x = 10;
player.width = 219*0.5;
player.height  = 375*0.5;
player.xspd = 5;
player.yspd = 5;
player.mapSize = 43*130;
player.mapSizeS1 = ctxS.clientWidth;
player.aimAngle = 0;
var frameTime = 30;
var enterStage0 = true;
var enterStage1 = false;
var enterStage2 = false;
var enterStage3 = false;
var enterStage4 = false;
var enterStage5 = false;
var controllerLimit = 4;
var dialogues = [["Your choice doesn't matter","But Destiny","Enter the room and get"
                        ,"4 choices and 4 chances"],
                ["HIT the target thrice","you have only 5 choices"],
                ["Complete the other two","Before Entering this room"],
                ["Keep Moving ==>","Forward"],
                ["Press shift to move faster and go back to play game",
                "To enter room press shift + upper Arrow"]];
var controllerText = "controller"; 
var undef = undefined;
var targetSpdY = 5;
var targetY = 0;
var targetDirectionbool = false;
var targetColor = 'black';
var totalBullets = 5;
var targetHit = 4;
var spdConst = 1;
var wallColor = '#990000';
var blockInitialPosition = 600;
images.bg = new Image();
images.bg.src = './img/bg.png';
var block={};
holdGun = false;
pressedCount = 0;
blockReset = function() {
    block.b1 = true;
    block.b2 = false;
    block.b3 = true;
    block.b4 = false;
    controllerLimit=4;
}
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
drawText = function(x=0,defaultPosition=199,text,font="30px Georgia") {
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
    } else if(enterStage3==true && targetHit<=0) {
        stage3();
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
stayInBoundary = (StageX,lowerBound,mapSize,map,exist=true,y,mapSizeH) => {
    if(player[StageX] < lowerBound && map=='map')
        player[StageX] = lowerBound;
    if(player[StageX] + player.width >= mapSize && exist == true) {
        player[StageX] = mapSize - player.width;
    }if(y != undef) {
        if(player[y] < lowerBound && map=='map')
            player[y] = lowerBound;
        if(player[y] + player.height >= mapSizeH) {
            player[y] = mapSizeH - player.height;
        }
    }
}
centerPlay = function(StageX,mapSize,n,text,font) {
    if(player[StageX] + player.width/2 >= ctxS.clientWidth/2 
        && player[StageX] + player.width/2 < mapSize - ctxS.clientWidth/2 && StageX=="x") {
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
        drawColoredMap("#ff4444");
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
            ctx.fillRect(blockInitialPosition+40*i,0,30,358);
    }
    ctx.fillStyle = "#555";
    for(let i=0;i<4;i++) {
        ctx.fillRect(blockInitialPosition+40*i,0,30,50);
    }
    ctx.restore();
}
drawControlBox = function() {
    ctx.save();
    ctx.fillStyle = "grey";
    ctx.fillRect(500,200,50,100);
    ctx.lineWidth = "2";
    ctx.rect(510,210,30,80);
    ctx.font = "10px Georgia";
    ctx.fillStyle = "black";
    for(let i=0;i<controllerText.length;i+=2) {
        ctx.fillText(controllerText.charAt(i),517,220+8*i);
        ctx.fillText(controllerText.charAt(i+1),526,220+8*i);
    }
    ctx.stroke();
    ctx.restore();
}

drawGun = function(xGun,yGun=0) {
    ctx.save();
    let x=800,y=250;
    if(holdGun == true) {
        x=xGun + player.width*2/3;
        y=180 + yGun;        
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
    ctx.fillRect(0,0,player.mapSizeWidthS2,player.mapSizeHeightS2);
    ctx.restore();
}
generateBullet = function(x=player.s2x,y=player.s2y + player.width*2/3,aimAngle=0) {
    self = {
        id: Math.random(),
        x:x + player.width/2 + 120,
        y:y,
        height:20,
        width:20,
        xspd:15,
        yspd:0,
        aimAngle:aimAngle
    }
    // self.yspd = Math.cos(self.aimAngle/180*Math.PI)*15;
    // self.xspd = Math.sin(self.aimAngle/180*Math.PI)*15;
    self.update = function(obj) {
        obj.x += obj.xspd*spdConst;
        obj.y += obj.yspd*spdConst;
        drawBullet(obj.x , obj.y);
    }
    bulletlist[self.id] = self;
}
// document.onclick = (mouse)=> {
//     if(enterStage2==true && holdGun==true) {
        // mouseX = mouse.clientX - document.getElementById('canvas').getBoundingClientRect().left;
        // mouseY = mouse.clientY - document.getElementById('canvas').getBoundingClientRect().top;
        // mouseX-=player.s2x;
        // mouseY-=player.s2y;
        // player.aimAngle = Math.atan2(mouseX,mouseY)/Math.PI * 180;
        // generateBullet(player.s2x,player.s2y,player.aimAngle);
//         generateBullet();
//     }
// }
drawBullet = function(x,y) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
drawEnemyWall = function(mapArea) {
    ctx.save();
    if(targetHit) {
        ctx.fillStyle = wallColor;
        if(totalBullets <=0) {
            holdGun = false;
        }
        if(totalBullets<0)
            totalBullets=0;
        ctx.fillRect(mapArea[0] * totalBullets/5,0,mapArea[0],mapArea[1]);
        ctx.fillStyle = targetColor;
        ctx.fillRect(mapArea[0] - 20,turnBack(mapArea),20,100);
        ctx.restore();
    }
}
turnBack = function(mapArea) {
    bulletTargetCollisionCheck(mapArea);
    if(targetY + 100 >= mapArea[1])
        targetDirectionbool = true;
    if(targetY  < 0)
        targetDirectionbool = false
    if(targetDirectionbool)    
        return targetY -= targetSpdY*spdConst;
    else
        return targetY += targetSpdY*spdConst;
}
bulletTargetCollisionCheck = function(mapArea) {
    for(let id in bulletlist) {
        if(bulletlist[id].x + bulletlist[id].width >= mapArea[0] - 100) {
            spdConst = 0.1;
        } 
        console.log(frameTime);
        if(targetHit) {
            if(bulletlist[id].x + bulletlist[id].width >= mapArea[0] - 10 && bulletlist[id].x <= mapArea[0]
            && bulletlist[id].y + bulletlist[id].height >= targetY && bulletlist[id].y <= targetY + 100) {
                delete bulletlist[id];
                spdConst = 1;        
                targetSpdY += 5;
                targetHit--;
                for(let i=0;i<=5;i++) {
                    setTimeout(() => {
                        targetColor = targetColor == 'black'?'#990000':'black';    
                        wallColor = wallColor == '#990000'?'#ff4444':'#990000'                  
                    }, 200*i);
                }
            } else if(bulletlist[id].x >= mapArea[0]) {
                delete bulletlist[id];
                spdConst = 1;        
                totalBullets--;
            }
        } 
    }
}