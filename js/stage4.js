player.s4x = 100;
player.s4y = 120;
string = [[4,1,20,10]];
blocks = {};
timeout=500;
stage4 = function() {
    ctx.save();
    TextS1 = [["Welcome to stage 4"]];
    TextS2 = [["Welcome to stage 4"]];
        if(player.pressingRight == true)
            player.s4x+=player.xspd;
        if(player.pressingLeft == true)
            player.s4x-=player.xspd;
        if(player.pressingTop == true)
            player.s4y-=player.yspd;
        if(player.pressingBottom == true)
            player.s4y+=player.yspd;
        let mapArea = newSizeCanvas();
        const x = centerPlay("s4x",mapArea[0]*2);
        const y = centerPlayY("s4y",mapArea[0]*2);
        mapMovement(xMovement,"s4x",player.mapSize,1,TextS2,"20px Georgia",yMovement,"s4y");        
        stayInBoundary("s4x",0,mapArea[0]*2,'map',true,"s4y",mapArea[0]*2);
        drawTrack(xMovement,yMovement);
        if(holdGun == true)
            drawGun(x,y-180+player.height/3);
        for(let id in bulletlist)
            bulletlist[id].update(bulletlist[id],"s4",-xMovement,-yMovement);
        ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,y,player.width,player.height);
    ctx.restore();
}
drawTrack = function(x,y) {
    for(let id in blocks) {
        blocks[id].update(blocks[id],x,y);
    }
}
randomBlockGenerator = function() {
    let i = string[0][0];
    let j =  string[0][1];
    var k = true;
    var a =setInterval(() => {
        generateBlock(i,j);
        if(k==true)
            i++;
        else
            i--;
        if(i==string[0][2]) {
            k=false;
            i--;
            j++;
        }
        if(i==string[0][0]) {
            k=true;
            i++;
            j++;
        }
        if(j==string[0][3])
            clearInterval(a);
    }, 20);
}
generateBlock = function(x,y,width=40,height=40,color="#ff7777") {
    self = {
        id:Math.random(),x:x,y:y,width:width,height:height,color:color
    }
    self.update = function(obj,x,y) {
        ctx.save();
        ctx.fillStyle = "#ff7777";
        ctx.lineWidth = 5;
        ctx.fillRect(obj.x*50-x,obj.y*50-y,obj.width,obj.height);
        ctx.fill();
        ctx.restore();
    }
    blocks[self.id]=self;
}
// ..........................................................................
var radius = 20;
var radiusConstant = 5;
var add = true;
drawMovingBubbles = function(x=0,y=300) {
    ctx.save();
    if(radius>1000)
        add=false;
    else if(radius<20)
        add=true;
    if(add)
        radius+=radiusConstant;
    else
        radius-=radiusConstant;
    ctx.lineWidth = 6;
    ctx.fillStyle = "#ff7777";
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}