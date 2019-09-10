player.s4x = 100;
player.s4y = 120;
//good for x not for y always + 1
// v,h,v,h,v,v,h,v,h
string = [[13,0,15,12,0],[0,9,9,12,0],[20,5,22,12,0],[0,18,2,21,1],[3,18,12,21,0],[13,12,15,46,0],
            [20,12,22,52,0],[3,43,13,46,0],[34,0,36,38,0],[34,38,36,42,1],[23,42,26,46,1],[27,42,51,46,0],
            [46,0,51,5,1]];
blocks = {};
gates = {};
buttons = {};
walls = {};

buttonString = [[6,15],[8,15],[10,15],[12,15],
                [26,38],[28,38],[30,38],[32,38],[41,1],[45,1],[43,3],[41,5],[45,5]];
wallString = [[13,0,3,46],[0,9,10,3],[20,5,3,47],[0,18,3,3],[3,18,9,3,],[3,43,10,3],[34,0,3,38],
                [34,38,3,4],[23,42,4,4],[27,42,24,4],[46,0,6,5]]
blockSpeed=30;
stage4 = function() {
    ctx.save();
    TextS1 = [["Welcome to stage 4"]];
    TextS2 = [["Welcome to stage 4"]];
        if(player.pressingRight == true)
            player.s4x+=player.xspd;
        if(player.pressingLeft == true)
            player.s4x-=player.xspd;
        if(player.pressingTop == true)
            player.s4y-=player.yspd;
        if(player.pressingBottom == true)
            player.s4y+=player.yspd;
        let mapArea = newSizeCanvas();
        const x = centerPlay("s4x",mapArea[0]*2);
        const y = centerPlayY("s4y",mapArea[0]*2);
        mapMovement(xMovement,"s4x",player.mapSize,1,TextS2,"27px Georgia",yMovement,"s4y");        
        stayInBoundary("s4x",0,mapArea[0]*2,'map',true,"s4y",mapArea[0]*2);
        drawTrack(xMovement,yMovement);
        setInterval(() => {
            for(let id in buttons) {
                if(buttons[id].blink)
                    buttons[id].fill = buttons[id].fill=="#ff7777"?"red":"#ff7777"; 
            }
        }, 300);
        drawMovingBubbles(9,38,-xMovement,-yMovement);
        if(holdGun == true)
            drawGun(x,y-180+player.height/3);
        for(let id in bulletlist)
            bulletlist[id].update(bulletlist[id],"s4",-xMovement,-yMovement);
        ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,y,player.width,player.height);
    ctx.restore();
}
wallBoundaries = function() {
    for(let i=0;i<wallString.length;i++) {
        self = {
            id:Math.random(),
            x:wallString[i][0]*50,
            y:wallString[i][1]*50,
            width:wallString[i][2]*50-10,
            height:wallString[i][3]*50-10
        }
        self.update = function(obj) {
            if(player.s4y + player.height > obj.y && 
                player.s4y < obj.y && player.s4x + player.width > obj.x&&
                player.s4x < obj.x + obj.width)
                    player.s4y -= player.xspd==20?20:5;
            if(player.s4y < obj.y + obj.height && 
                player.s4y + player.height > obj.y + obj.height && player.s4x + player.width > obj.x&&
                player.s4x < obj.x + obj.width)
                    player.s4y += player.xspd==20?20:5;
            if(player.s4x + player.width > obj.x && player.s4x < obj.x 
                && player.s4y + player.height > obj.y&& 
                player.s4y < obj.y + obj.height)
                    player.s4x -= player.xspd==20?20:5;
            if(player.s4x < obj.x + obj.width && player.s4x + player.width > obj.x + obj.width 
                && player.s4y + player.height > obj.y&& 
                player.s4y < obj.y + obj.height)
                    player.s4x += player.xspd==20?20:5;
        }
        walls[self.id] = self;
    }
}
drawTrack = function(x,y) {
    for(let id in blocks) {
        blocks[id].update(blocks[id],x,y);
    }
    for(let id in gates) {
        gates[id].update(gates[id],x,y)
    }
    for(let id in buttons) {
        buttons[id].update(buttons[id],x,y);
    }
    for(let id in walls) {
        walls[id].update(walls[id]);
    }
}
randomBlockGenerator = function() {
        var h = 0;
        var i = string[h][0];
        var j =  string[h][1];
        var k = true;
        var a = setInterval(() => {
        var color = string[h][4]==0?"#e14c21":"purple";
        generateBlock(i,j,color);
        if(k==true)
            i++;
        else
            i--;
        if(i>string[h][2]) {
            k=false;
            i--;
            j++;
        }
        if(i<string[h][0]) {
            k=true;
            i++;
            j++;
        }
        if(j==string[h][3]) {
            if(++h < string.length) {
                i = string[h][0];
                j =  string[h][1];
                k = true;
            } 
            else
                clearInterval(a);
        }
    }, blockSpeed);
}
generateBlock = function(x,y,color,width=40,height=40) {
    ctx.save();
    self = {
        id:Math.random(),x:x,y:y,width:width,height:height,color:color
    }
    self.update = function(obj,x,y) {
        ctx.save();
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x*50-x,obj.y*50-y,obj.width,obj.height);
        ctx.restore();
    }
    if(color=="purple")
        gates[self.id]=self;
    else
        blocks[self.id]=self;
    ctx.restore();
}
generateButtons = function() {
    for(let i=0;i<buttonString.length;i++) {
        drawButtons(buttonString[i][0],buttonString[i][1]);
    }
}
drawButtons = function(x,y) {
    self = {
        id:Math.random(),
        x:x,y:y,fill:"#ff7777",
        blink:false,
    }
    self.update = function(obj,x,y){
        ctx.save();
        ctx.lineWidth = 4;
        ctx.fillStyle = obj.fill;
        ctx.beginPath();
        ctx.arc(obj.x*50-x,obj.y*50-y, 40, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    buttons[self.id] = self;
}
blockBoundary = function() {
    
}
// blockBoundary = function() {
//     for(let id in blocks) {
//         if(player.s4x + player.width > blocks[id].x*50 && player.s4x < blocks[id].x*50
//             && (player.s4y >= blocks[id].y*50 + blocks[id].height && 
//                 player.s4y + player.height>=blocks[id].y*50)){
//                     player.s4x = blocks[id].x*50 - player.width;
//                     // alert(1);
//                 }  
//         if(player.s4x < blocks[id].x*50 + blocks[id].width
//             && player.s4x + player.width > blocks[id].x*50 + blocks[id].width
//             && (player.s4y >= blocks[id].y*50 + blocks[id].height && 
//                 player.s4y + player.height>=blocks[id].y*50)){
//                     player.s4x = blocks[id].x*50 + blocks[id].width;
//                     // alert(2);
//                 }
//         if(player.s4y + player.height > blocks[id].y*50 && player.s4y < blocks[id].y*50
//             && (player.s4x + player.width >= blocks[id].x*50 && 
//                 player.s4x <= blocks[id].x*50 + blocks[id].width)) {
//                     player.s4x-=player.xspd;
//                     player.s4y = blocks[id].y*50 - player.height;
//                     // alert(3);
//                 }
//         if(player.s4y < blocks[id].y*50 + blocks[id].height && player.s4y + player.height > blocks[id].y*50 + blocks[id].height
//             && (player.s4x + player.width >= blocks[id].x*50 &&
//                 player.s4x <= blocks[id].x*50 + blocks[id].width)) {
//                     player.s4x-=player.xspd;
//                     player.s4y = blocks[id].y*50 + blocks[id].height;
//                     // alert(4);
//                 }
//     }
// }
//...........................................................................
arr =[];
i=0;
k=0;
cntB = function() {
    for(let id in blocks)
        arr[i++]= id;
}
delB = function() {
    ca = setInterval(() => {
        delete blocks[arr[k]];
        k++;
        if(k>arr.length)
            clearInterval(ca);
    }, blockSpeed);
}
// ..........................................................................
var radius = 110;
var radiusConstant = 1;
var add = true;
drawMovingBubbles = function(x=1,y=3,xMovement,yMovement) {
    ctx.save();
    if(radius>150)
        add=false;
    else if(radius<100)
        add=true;
    if(add)
        radius+=radiusConstant;
    else
        radius-=radiusConstant;
    ctx.lineWidth = 6;
    ctx.fillStyle = "#ff7777";
    ctx.beginPath();
    ctx.arc(x*50+xMovement,y*50+yMovement, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}