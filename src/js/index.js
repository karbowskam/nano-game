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
window.addEventListener("load", start);

function start() {
  c.fillStyle = "green";
  c.fillRect(10, 10, 30, 30);
  c.drawImage(image, 20, 40);
}
