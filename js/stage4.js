player.s4x = 100;
stage4 = function() {
    ctx.save();
    TextS1 = [["Welcome to stage 4"]];
    TextS2 = [["Welcome to stage 4"]];
        if(player.pressingRight == true)
            player.s4x+=player.xspd;
        if(player.pressingLeft == true)
            player.s4x-=player.xspd;
        const x = centerPlay("s4x",player.mapSizeS1,1,TextS2,"27px Georgia"); 
        if(holdGun == true)
            drawGun(x);
        stayInBoundary("s4x",0,player.mapSizeS1,'map');
        ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore();
}
