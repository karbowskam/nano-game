import "../scss/style.scss";

/*
  ____    _             _        
 / ___|  | |_    __ _  | |   ___ 
 \___ \  | __|  / _` | |//  / _ \
  ___) | | |_  | (_| | //| |  __/
 |____/   \__|  \__,_| |_|  \___|

 */

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
// var NANONAUT_WIDTH = 181;
var NANONAUT_HEIGHT = 229;
var GROUND_Y = 540;
var NANONAUT_Y_ACCELERATION = 1;
var SPACE_KEYCODE = 32;
var NANONAUT_JUMP_SPEED = 20;
var NANONAUT_X_SPEED = 5;

/*
  _  __                   __                          _                                  
 | |/ /   ___    _ __    / _|       __      __  ___  | |_    ___   _ __    _ __     __ _ 
 | ' /   / _ \  | '_ \  | |_        \ \ /\ / / / __| | __|  / _ \ | '_ \  | '_ \   / _` |
 | . \  | (_) | | | | | |  _|  _     \ V  V /  \__ \ | |_  |  __/ | |_) | | | | | | (_| |
 |_|\_\  \___/  |_| |_| |_|   (_)     \_/\_/   |___/  \__|  \___| | .__/  |_| |_|  \__,_|
                                                              (_( |_|                    

*/

var canvas = document.createElement("canvas");
var c = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

var nanonautImage = new Image();
nanonautImage.src = "img/Nanonaut.png";

var nanonautX = 50;
var nanonautY = 40;

var backgroundImage = new Image();
backgroundImage.src = "img/background.png";

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("load", start);

function start() {
  window.requestAnimationFrame(mainLoop);
}

var nanonautYSpeed = 0;
var nanonautIsInTheAir = false;
var spaceKeyIsPressed = false;

var cameraX = 0;
var cameraY = 0;

/*
  ____           _     _                     _     __                             
 |  _ \    ___  | |_  | |   __ _      __ _  | |   /_/   __      __  _ __     __ _ 
 | |_) |  / _ \ | __| | |  / _` |    / _` | |//  / _ \  \ \ /\ / / | '_ \   / _` |
 |  __/  |  __/ | |_  | | | (_| |   | (_| | //| | (_) |  \ V  V /  | | | | | (_| |
 |_|      \___|  \__| |_|  \__,_|    \__, | |_|  \___/    \_/\_/   |_| |_|  \__,_|
            (_(                      |___/                                        

*/

function mainLoop() {
  update();
  draw();
  window.requestAnimationFrame(mainLoop);
}

/*
  ____    _                                                      _        
 / ___|  | |_    ___   _ __    ___   __      __   __ _   _ __   (_)   ___ 
 \___ \  | __|  / _ \ | '__|  / _ \  \ \ /\ / /  / _` | | '_ \  | |  / _ \
  ___) | | |_  |  __/ | |    | (_) |  \ V  V /  | (_| | | | | | | | |  __/
 |____/   \__|  \___| |_|     \___/    \_/\_/    \__,_| |_| |_| |_|  \___|

 */

function onKeyDown(event) {
if (event.keyCode === SPACE_KEYCODE) {
  spaceKeyIsPressed = true;
}
}

function onKeyUp(event) {
  if (event.keyCode === SPACE_KEYCODE) {
    spaceKeyIsPressed = false;
  }
}

/*
     _      _      _                     _   _                          _         
    / \    | | __ | |_   _   _    __ _  | | (_)  ____   __ _    ___    (_)   __ _ 
   / _ \   | |/ / | __| | | | |  / _` | | | | | |_  /  / _` |  / __|   | |  / _` |
  / ___ \  |   <  | |_  | |_| | | (_| | | | | |  / /  | (_| | | (__    | | | (_| |
 /_/   \_\ |_|\_\  \__|  \__,_|  \__,_| |_| |_| /___|  \__,_|  \___|  _/ |  \__,_|
                                                                     |__/         

*/

function update() {
  nanonautX = nanonautX + NANONAUT_X_SPEED;
  if (spaceKeyIsPressed && !nanonautIsInTheAir) {
    nanonautYSpeed = -NANONAUT_JUMP_SPEED;
    nanonautIsInTheAir = true;
  }
  // Zaktualizuj Nanonautę
  nanonautY = nanonautY + nanonautYSpeed;
  nanonautYSpeed = nanonautYSpeed + NANONAUT_Y_ACCELERATION;
  if (nanonautY > GROUND_Y - NANONAUT_HEIGHT) {
    nanonautY = GROUND_Y - NANONAUT_HEIGHT;
    nanonautYSpeed = 0;
    nanonautIsInTheAir = false;
  
  }
  // Zaktualizuj kamerę
  cameraX = nanonautX - 150;
}

/*
  ____                                                     _        
 |  _ \   _   _   ___    ___   __      __   __ _   _ __   (_)   ___ 
 | |_) | | | | | / __|  / _ \  \ \ /\ / /  / _` | | '_ \  | |  / _ \
 |  _ <  | |_| | \__ \ | (_) |  \ V  V /  | (_| | | | | | | | |  __/
 |_| \_\  \__, | |___/  \___/    \_/\_/    \__,_| |_| |_| |_|  \___|
          |___/                                                     

*/

function draw() {
  c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Narysuj niebo
  c.fillStyle = "LightSkyBlue";
  c.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y - 40);

  // Narysuj tło
  c.drawImage(backgroundImage, 0 - cameraX, -210);

  // Narysuj ziemię
  c.fillStyle = "ForestGreen";
  c.fillRect(0, GROUND_Y - 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Narysuj nanonautę
  c.drawImage(nanonautImage, nanonautX - cameraX, nanonautY - cameraY);
}
