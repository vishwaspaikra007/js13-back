document.onkeydown =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = true;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = true;        
    }if(event.keyCode == 16) {
        player.xspd = 20;        
    }if(event.keyCode == 49) {
        if(player.x > 100 && player.x < 200)
            enterStage1 = true;
    }
}

document.onkeyup =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = false;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = false;        
    }if(event.keyCode == 16) {
        player.xspd = 5;        
    }if(event.keyCode == 49) {
        if(player.x > 100 && player.x < 200)
            enterStage1 = true;
    }
}