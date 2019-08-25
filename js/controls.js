document.onkeydown =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = true;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = true;        
    }if(event.keyCode == 16) {
        player.xspd = 20;        
    }
}
document.onkeyup =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = false;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = false;        
    }if(event.keyCode == 16) {
        player.xspd = 5;        
    }if(event.keyCode == 13) {
        if(player.x > 100 && player.x < 200 && enterStage0 == true) {
            pressedCount = 0;
            blockReset();
            enterStageCheck('enterStage1');
        } else if(player.s1x > 100 && player.s1x < 200  && enterStage1 == true) {
            enterStageCheck('enterStage0');
        }
    } 
    if(player.s1x + player.width/2 >= 300 && player.s1x + player.width/2 <= 350 && pressedCount < 4) {
    if(event.keyCode == 49) {
        pressedCount++;
        block.b3 = !block.b3;        
        block.b4 = !block.b2;
        block.b1 = !block.b1;
    }if(event.keyCode == 50) {
        pressedCount++;
        block.b2 = !block.b2;  
        block.b4 = !block.b4;
    }if(event.keyCode == 51) {
        pressedCount++;
        block.b2 = !block.b2;        
        block.b1 = !block.b1; 
        block.b3 = !block.b3;        
    }if(event.keyCode == 52) {
        pressedCount++;
        block.b1 = !block.b1;
        block.b4 = !block.b4;
    }}
}
enterStageCheck = function(value) {
    enterStage0 = value=='enterStage0'?true:false;
    enterStage1 = value=='enterStage1'?true:false;
    console.log(enterStage0, enterStage1);
}