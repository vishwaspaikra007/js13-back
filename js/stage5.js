player.s5x = 100;
stage5 = function() {
    ctx.save();
    TextS1 = [["Welcome to stage 5"]];
    TextS2 = [["Welcome to stage 5"]];
    if(player.pressingRight == true)
        player.s5x+=player.xspd;
    if(player.pressingLeft == true)
        player.s5x-=player.xspd;
    const x = centerPlay("s5x",player.mapSizeS1);
    mapMovement(xMovement,"s5x",player.mapSize,1,TextS2,"27px Georgia");
    if(holdGun == true)
        drawGun(x);
    stayInBoundary("s5x",0,player.mapSizeS1,'map');
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore();
}