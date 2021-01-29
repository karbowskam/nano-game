import "../scss/style.scss";

var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var c = canvas.getContext("2d");
c.fillStyle = "green";
c.fillRect(10, 10, 30, 30);
document.body.appendChild(canvas);

var image = new Image();
image.src = "img/Nanonaut.png";

var x = 0;
var y = 40;

window.addEventListener("load", start);

function start() {
  window.requestAnimationFrame(loop);
}

function loop() {
  c.clearRect(0, 0, 800, 600);
  c.drawImage(image, x, y);
  x = x +1;
  window.requestAnimationFrame(loop);
}
