player.s1x = 100;
pressToOpenText = [["Press 1 to open 1st bar","and 2nd to open second bar and so on",
                    "understand the pattern and unlock it"]];
stage1 = function() {
    ctx.save();
    if(player.pressingRight == true)
        player.s1x+=player.xspd;
    if(player.pressingLeft == true)
        player.s1x-=player.xspd;
    const x = centerPlay("s1x",player.mapSizeS1,1,pressToOpenText,"20px Georgia"); 
    stayInBoundary("s1x",0,player.mapSizeS1,'map');
    for(let i=0;i<4;i++)
        stayInBoundary("s1x",500+40*i,500+40*i);
    ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,120,player.width,player.height);
    ctx.restore();
}
