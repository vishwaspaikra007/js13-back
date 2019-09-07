player.s4x = 100;
player.s4y = 120;
var radius = 20;
var radiusConstant = 5;
var add = true;
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
        if(holdGun == true)
            drawGun(x);
        stayInBoundary("s4x",0,mapArea[0]*2,'map',true,"s4y",mapArea[0]*2);
        ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,y,player.width,player.height);
    ctx.restore();
}
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