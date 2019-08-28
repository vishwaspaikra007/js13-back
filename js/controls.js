document.onkeydown =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = true;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = true;        
    }if(event.keyCode == 16) {
        player.xspd = 20;        
        player.yspd = 20;        
    }if(enterStage2 == true) {
        if(event.keyCode == 87 || event.keyCode == 38) {
            player.pressingTop = true;
        }if(event.keyCode == 83 || event.keyCode == 40) {
            player.pressingBottom = true;        
        }
    }
}
document.onkeyup =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = false;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = false;        
    }if(event.keyCode == 16) {
        player.xspd = 5;        
        player.yspd = 5;        
    }if(event.keyCode == 13) {
        if(player.x > 100 && player.x < 200 && enterStage0 == true) {
            pressedCount = 0;
            blockReset();
            enterStageCheck('enterStage1');
        } else if(player.x > 100*(10*1+1) && player.x < 100*(10*1+1) +100 && enterStage0 == true) {
            enterStageCheck('enterStage2');
        } else if(player.s1x > 100 && player.s1x < 200  && enterStage1 == true) {
            enterStageCheck('enterStage0');
        } else if(player.s2x >= 100 && player.s2x < 200  && enterStage2 == true) {
            enterStageCheck('enterStage0');
            defaultSizeCanvas();
        }
    } if(enterStage2 == true) {
        if(event.keyCode == 87 || event.keyCode == 38) {
            player.pressingTop = false;
        }if(event.keyCode == 83 || event.keyCode == 40) {
            player.pressingBottom = false;        
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
    if(event.keyCode == 32) {
        if(enterStage2==true && holdGun==true) {
            generateBullet();
        }       
    }
}
enterStageCheck = function(value) {
    enterStage0 = value=='enterStage0'?true:false;
    enterStage1 = value=='enterStage1'?true:false;
    enterStage2 = value=='enterStage2'?true:false;
    console.log(enterStage0, enterStage1);
}
defaultSizeCanvas = function() {
    ctxS.width = 900;
    ctxS.height = 300;
}