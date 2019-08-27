player.s2x = 100;
player.s2y = 120;
TextS2 = [["Hello You are in stage 2","Don't forget to enjoy the ride",
                    "Something will be behind you"]];
stage2 = function() {
    ctx.save();
    if(player.pressingRight == true)
        player.s2x+=player.xspd;
    if(player.pressingLeft == true)
        player.s2x-=player.xspd;
    if(player.pressingTop == true)
        player.s2y-=player.yspd;
    if(player.pressingBottom == true)
        player.s2y+=player.yspd;
    let mapHeight = newSizeCanvas();
    const x = centerPlay("s2x",player.mapSizeWidthS2,1,TextS2,"20px Georgia"); 
    stayInBoundary("s2x",0,player.mapSizeWidthS2,'map',true,"s2y",mapHeight);
    if(holdGun == true)
        drawGun(x,player.s2y-180 + player.height/3);
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,player.s2y,player.width,player.height);    
    ctx.restore();
}
newSizeCanvas = function() {
    var body = document.getElementById('body');
    player.mapSizeWidthS2 = ctxS.width = body.clientWidth;
    return player.mapSizeHeightS2 = ctxS.height = body.clientHeight;
}