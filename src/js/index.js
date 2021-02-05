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
var NANONAUT_WIDTH = 181;
var NANONAUT_HEIGHT = 229;
var GROUND_Y = 540;
var NANONAUT_Y_ACCELERATION = 1;
var SPACE_KEYCODE = 32;
var NANONAUT_JUMP_SPEED = 20;
var NANONAUT_X_SPEED = 5;
var BACKGROUND_WIDTH = 1000;
var NANONAUT_NR_FRAMES_PER_ROW = 5;
var NANONAUT_NR_ANIMATION_FRAMES = 7;
var NANONAUT_ANIMATION_SPEED = 3;

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
nanonautImage.src = "img/animatedNanonaut.png";

var nanonautX = CANVAS_WIDTH / 2;
var nanonautY = GROUND_Y - NANONAUT_HEIGHT;

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
var nanonautFrameNr = 0;

var cameraX = 0;
var cameraY = 0;

var gameFrameCounter = 0;

var bush1Image = new Image();
bush1Image.src = "img/bush1.png";

var bush2Image = new Image();
bush2Image.src = "img/bush2.png";

var bushData = generateBushes();

function generateBushes() {
  var generatedBushData = [];
  var bushX = 0;
  while (bushX < (2 * CANVAS_WIDTH)) {
    var bushImage;
    if (Math.random() >= 0.5) {
    bushImage = bush1Image;
  }
   else {
     bushImage = bush2Image;
   }
  generatedBushData.push({
    x: bushX,
    y: 80 + Math.random() * 20,
    image: bushImage
  });
  bushX += 150 + Math.random() * 200;
  }
  return generatedBushData;
}
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
  gameFrameCounter = gameFrameCounter + 1;
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
  //Zaktualizuj animację
  if (gameFrameCounter % NANONAUT_ANIMATION_SPEED === 0) {
    nanonautFrameNr = nanonautFrameNr + 1;
    if (nanonautFrameNr >= NANONAUT_NR_ANIMATION_FRAMES) {
      nanonautFrameNr = 0;
    }
  }
  // Zaktualizuj kamerę
  cameraX = nanonautX - 150;

  // Zaktualizuj krzaczki
  for (var i = 0; i < bushData.length; i++) {
    if (bushData[i].x - cameraX < -CANVAS_WIDTH) {
      bushData[i].x += 2 * CANVAS_WIDTH + 150;
    }
  }
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
  var backgroundX = -(cameraX % BACKGROUND_WIDTH);
  c.drawImage(backgroundImage, backgroundX, -210);
  c.drawImage(backgroundImage, backgroundX + BACKGROUND_WIDTH, -210);

  // Narysuj ziemię
  c.fillStyle = "ForestGreen";
  c.fillRect(0, GROUND_Y - 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Narysuj nanonautę
  var nanonautSpriteSheetRow = Math.floor(
    nanonautFrameNr / NANONAUT_NR_FRAMES_PER_ROW
  );
  var nanonautSpriteSheetColumn = nanonautFrameNr % NANONAUT_NR_FRAMES_PER_ROW;
  var nanonautSpriteSheetX = nanonautSpriteSheetColumn * NANONAUT_WIDTH;
  var nanonautSpriteSheetY = nanonautSpriteSheetRow * NANONAUT_HEIGHT;
  c.drawImage(
    nanonautImage,
    nanonautSpriteSheetX,
    nanonautSpriteSheetY,
    NANONAUT_WIDTH,
    NANONAUT_HEIGHT,
    nanonautX - cameraX,
    nanonautY - cameraY,
    NANONAUT_WIDTH,
    NANONAUT_HEIGHT
  );

  //Narysuj krzaczki
  for (var i = 0; i < bushData.length; i++) {
    c.drawImage(
      bushData[i].image,
      bushData[i].x - cameraX,
      GROUND_Y - bushData[i].y - cameraY
    );
  }
}
