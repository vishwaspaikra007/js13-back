player.s4x = 100;
player.s4y = 120;
//good for x not for y always + 1
// v,h,v,h,v,v,h,v,h
string = [[13,0,15,12],[0,9,9,12],[20,5,22,12],[3,18,12,21],[13,12,15,46],
            [20,12,22,52],[4,43,13,46],[34,0,36,38],[27,42,51,46]];
blocks = {};
gates = {first:[0]}
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
        if(holdGun == true)
            drawGun(x,y-180+player.height/3);
        for(let id in bulletlist)
            bulletlist[id].update(bulletlist[id],"s4",-xMovement,-yMovement);
        ctx.drawImage(document.getElementById('svg'), 0, 0, 219,375,x,y,player.width,player.height);
    ctx.restore();
}
drawTrack = function(x,y) {
    for(let id in blocks) {
        blocks[id].update(blocks[id],x,y);
    }
}
randomBlockGenerator = function(loop=0) {
        var h = loop;
        var i = string[h][0];
        var j =  string[h][1];
        var k = true;
        var a = setInterval(() => {
        generateBlock(i,j);
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
generateBlock = function(x,y,id=Math.random(),color="#ff7777",width=40,height=40) {
    self = {
        id:id,x:x,y:y,width:width,height:height,color:color
    }
    self.update = function(obj,x,y) {
        ctx.save();
        ctx.fillStyle = "#e14c21";
        ctx.lineWidth = 5;
        ctx.fillRect(obj.x*50-x,obj.y*50-y,obj.width,obj.height);
        ctx.fill();
        ctx.restore();
    }
    blocks[self.id]=self;
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
var radius = 20;
var radiusConstant = 5;
var add = true;
drawMovingBubbles = function(x=0,y=300) {
    ctx.save();
    if(radius>1000)
        add=false;
    else if(radius<20)
        add=true;
    if(add)
        radius+=radiusConstant;
    else
        radius-=radiusConstant;
    ctx.lineWidth = 6;
    ctx.fillStyle = "#ff7777";
    ctx.beginPath();
    ctx.arc(x,y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}