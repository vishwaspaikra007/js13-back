Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}
var controller = [ 49, 50, 51, 52];

document.onkeydown =(event)=> {
    if(event.keyCode == 68 || event.keyCode == 39) {
        player.pressingRight = true;
    }if(event.keyCode == 65 || event.keyCode == 37) {
        player.pressingLeft = true;        
    }if(event.keyCode == 16) {
        player.xspd = 20;        
        player.yspd = 20;        
    }if(enterStage3 == true) {
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
    }if(enterStage3 == true) {
        if(event.keyCode == 87 || event.keyCode == 38) {
            player.pressingTop = false;
        }if(event.keyCode == 83 || event.keyCode == 40) {
            player.pressingBottom = false;        
        }
    }if(event.keyCode == 16) {
        player.xspd = 5;        
        player.yspd = 5;        
    }if(event.keyCode == 13) {
        if(player.x > 100 && player.x < 200 && enterStage0 == true) {
            blockReset();
            controller.shuffle();
            enterStageCheck('enterStage1');
        } else if(player.x > 100*(10*1+1) && player.x < 100*(10*1+1) +100 && enterStage0 == true) {
            if(targetHit || totalBullets<=0)
                totalBullets = 5;
            if(targetHit) {
                targetHit = 4;
                targets.s2yspd = 5;
            }
            enterStageCheck('enterStage2');        
        } else if(player.x > 100*(10*2+1) && player.x < 100*(10*2+1) +100 && enterStage0 == true) {
            enterStageCheck('enterStage3');        
        } else if(player.s1x > 100 && player.s1x < 200  && enterStage1 == true) {
            enterStageCheck('enterStage0');
            showText1 = !showText1;
        } else if(player.s2x >= 100 && player.s2x < 200  && enterStage2 == true) {
            enterStageCheck('enterStage0');
            defaultSizeCanvas();
        } else if(player.s3x >= 100 && player.s3x < 200  && enterStage3 == true) {
            enterStageCheck('enterStage0');
            defaultSizeCanvas();
        }
    } 
    if(player.s1x + player.width/2 >= 500 && player.s1x + player.width/2 <= 550) {
        if(controllerLimit>0) {
            if(event.keyCode == controller[0]) {
                controllerLimit--;
                block.b4 = !block.b4;        
                block.b2 = !block.b2;
                block.b1 = !block.b1;
            }if(event.keyCode == controller[1]) {
                controllerLimit--;
                block.b2 = !block.b2;  
                block.b4 = !block.b4;
            }if(event.keyCode == controller[2]) {
                controllerLimit--;
                block.b2 = !block.b2;        
                block.b1 = !block.b1;
                block.b3 = !block.b3;       
            }if(event.keyCode == controller[3]) {
                controllerLimit--;
                block.b1 = !block.b1;
                block.b4 = !block.b4;
            }
        }
    if(event.keyCode == 82)
        blockReset();
    }
    if(event.keyCode == 32) {
        if((enterStage2==true || enterStage3==true) && holdGun==true) {
            generateBullet();
        }       
    }
    if(event.keyCode == 73) {
        showText1=!showText1;        
    }
}
enterStageCheck = function(value) {
    enterStage0 = value=='enterStage0'?true:false;
    enterStage1 = value=='enterStage1'?true:false;
    enterStage2 = value=='enterStage2'?true:false;
    enterStage3 = value=='enterStage3'?true:false;
    console.log(enterStage0, enterStage1);
}
defaultSizeCanvas = function() {
    ctxS.width = 980;
    ctxS.height = 300;
}