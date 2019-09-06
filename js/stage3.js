player.s3x = 100;
player.s3y = 120;
targetY1 = 0;
targetY2 = 0;
targetY3 = 0;
fillStyleTargetS3 = ['#ff7777','#ff7777','#ff7777'];
stage3 = function() {
    ctx.save();
    TextS2 = [["HIT the three circular bubbles"]];
    if(player.pressingTop == true)
        player.s3y-=player.yspd;
    if(player.pressingBottom == true)
        player.s3y+=player.yspd;
    let mapArea = newSizeCanvas();
    const x = centerPlay("s3x",player.mapSizeWidthS2,1,TextS2,"20px Georgia");
    // drawEnemyWall(mapArea);
    drawObstacles(mapArea);
    drawTarget(mapArea);
    stayInBoundary("s3x",0,player.mapSizeWidthS2,'map',true,"s3y",mapArea[1]);
    if(holdGun == true)
        drawGun(x,player.s3y-180 + player.height/3);
    for(let id in bulletlist) {
        bulletlist[id].update(bulletlist[id]);
    }
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,player.s3y,player.width,player.height); 
    ctx.restore();
    
}
drawObstacles = function(mapArea) {
    for(let i=1;i<4;i++) {
        ctx.drawImage(images.bg,mapArea[0]-150-i*targets.s3Width*2,
            turnBack(mapArea,`s3y${i}`,`s3y${i}spd`,`s3x${i}`,"s3Width","s3Height"),
            targets.s3Width,targets.s3Height);
        bulletTargetCollisionCheck(`s3y${i}`,`s3y${i}spd`,`s3x${i}`,"s3Width","s3Height");
    }
}

drawTarget = function(mapArea) {
    ctx.save();
    ctx.lineWidth = 6;
    const center = (mapArea[1]/3)/2;
    ctx.beginPath();
    ctx.moveTo(mapArea[0]-60, 100);
    ctx.lineTo(mapArea[0]-60, 500);
    ctx.stroke();
    for(let i=1;i<4;i++) {
        bulletTargetCollisionCheck(`s3T${i}y`,0,"s3Tx","s3TWidth","s3THeight");
        ctx.fillStyle = fillStyleTargetS3[i-1];
        ctx.beginPath();
        ctx.arc(mapArea[0]-100,mapArea[1]*i/3 - center, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();
}
