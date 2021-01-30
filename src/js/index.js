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

window.addEventListener("load", start);

function start() {
  window.requestAnimationFrame(mainLoop);
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

/*
     _      _      _                     _   _                          _         
    / \    | | __ | |_   _   _    __ _  | | (_)  ____   __ _    ___    (_)   __ _ 
   / _ \   | |/ / | __| | | | |  / _` | | | | | |_  /  / _` |  / __|   | |  / _` |
  / ___ \  |   <  | |_  | |_| | | (_| | | | | |  / /  | (_| | | (__    | | | (_| |
 /_/   \_\ |_|\_\  \__|  \__,_|  \__,_| |_| |_| /___|  \__,_|  \___|  _/ |  \__,_|
                                                                     |__/         

*/

function update() {
  // Zaktualizuj Nanonautę
  nanonautY = nanonautY + 1;
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
  c.drawImage(backgroundImage, 0, -210);

  // Narysuj ziemię
  c.fillStyle = "ForestGreen";
  c.fillRect(0, GROUND_Y - 40, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y + 40);

  // Narysuj nanonautę
  c.drawImage(nanonautImage, nanonautX, nanonautY);
}
