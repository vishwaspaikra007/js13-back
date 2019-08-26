player.s2x = 100;
TextS2 = [["Hello You are in stage 2","Don't forget to enjoy the ride",
                    "Something will be behind you"]];
stage2 = function() {
    ctx.save();
    if(player.pressingRight == true)
        player.s2x+=player.xspd;
    if(player.pressingLeft == true)
        player.s2x-=player.xspd;
    const x = centerPlay("s2x",player.mapSizeS1,1,TextS2,"20px Georgia"); 
    stayInBoundary("s2x",0,player.mapSizeS1,'map');
    if(holdGun == true)
        drawGun(x);
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);    
    ctx.restore();
}
