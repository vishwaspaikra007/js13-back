var frames = setInterval(() => {
    update();
}, frameTime);

function update() {
    drawMap();
    drawDoor();
    drawText();
}