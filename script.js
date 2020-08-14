// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background
 *    colorMode, RGB, ellipse
 *    frameRate,
 *    width, height,
 *    rect, text
 *    stroke, noStroke, noFill, fill, collideRectRect
 *    keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW
 *    round, random
 *    windowWidth, windowHeight
 *    keyIsDown, frameCount,
 *    triangle, circle, ellipse
 *    rotate, PI
 *    random, translate,
 *    createVector,
 *    cos, sin, p5
 *    spaceShip, bullet
 *    key, asteroid
 *    text, textSize, font
 *    loadFont, textFont
 *    strokeWeight
 *    mouseX, mouseY
 *    dist
 *    collideCircleCircle
 */

let player;
let score;
let asteroids;
let lasers;
let start;
let box;
let cnv;
let lives;
let level;

function setup() {
  player = new spaceShip();
  score = 0;
  lives = 3;
  level = 1000;
  start = false;
  lasers = new Array();

  colorMode(RGB, 255, 255, 255);
  cnv = createCanvas(windowWidth - 20, windowHeight - 20);
  background(0, 0, 0);

  // controls the number of asteroids
  asteroids = new Array();
  for (var i = 7; i > 0; i--) {
    asteroids.push(new asteroid());
  }
}

function draw() {
  background(0, 0, 0);

  // displays score
  textSize(16);
  fill(255, 255, 255);
  text("score: " + score, 10, 20);

  // displays lives
  textSize(16);
  fill(255, 255, 255);
  text("lives: " + lives, 10, 40);

  // displays start screen
  if (!start) {
    textSize(64);
    noFill();
    stroke(255);
    strokeWeight(1.5);
    text("ASTEROIDS", width / 2 - 150, height / 2 - 100);

    textSize(32);
    noFill();
    stroke(255);
    strokeWeight(1.5);
    text("PLAY GAME", width / 2 - 65, height / 2 + 50);

    // invisible button
    noFill();
    noStroke();
    box = rect(width / 2 - 70, height / 2 + 10, 200, 50);
    cnv.mouseClicked(keyPressed);

    // displays asteroids
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].float();
      asteroids[i].display();
    }
  }

  // when the game starts
  if (start && !gameOver()) {
    // checks for collisions
    for (var i = 0; i < lasers.length; i++) {
      for (var j = 0; j < asteroids.length; j++) {
        if (
          checkCollisions(
            lasers[i].vector.x,
            lasers[i].vector.y,
            asteroids[j].x,
            asteroids[j].y,
            asteroids[j].r
          )
        ) {
          lasers.splice(i, 1);
          asteroids[j].split(j);
          break;
        }
      }
    }

    // displays asteroids
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].float();
      asteroids[i].display();

      // collision of asteroid and ship
      var distance = dist(
        player.vector.x - 3,
        player.vector.y,
        asteroids[i].x,
        asteroids[i].y
      );
      if (distance <= asteroids[i].r + player.r) {
        lives--;
        console.log(lives);
        player.vector.x = (windowWidth - 20) / 2;
        player.vector.y = (windowHeight - 20) / 2;
        asteroids.splice(i, 1);
        asteroids.push(new asteroid());
        break;
      }
    }

    // displays bullets
    for (var i = 0; i < lasers.length; i++) {
      lasers[i].move();
      lasers[i].update(i);
    }

    // shows spaceShip
    player.show();
    player.move();
    player.update();

    if (score >= level) {
      level += 500;
      asteroids.push(new asteroid(random(-width)));
      asteroids.push(new asteroid(random(-height)));
      asteroids.push(new asteroid(random(-width)));
    }
  }
}

function keyPressed() {
  if (key == " ") {
    lasers.push(new bullet(player.vector, player.angle));
  }

  // button for the play game text
  if (gameOver() || start == false) {
    if (mouseX > width / 2 - 70 && mouseX < width / 2 + 130) {
      if (mouseY > height / 2 + 10 && mouseY < height / 2 + 60) {
        // setup for the game (if game is over)
        start = true;
        if (gameOver) {
          lives = 3;
          player = new spaceShip();
          score = 0;
          lasers = new Array();
          asteroids = new Array();
          for (var i = 6; i > 0; i--) {
            asteroids.push(new asteroid());
          }
        }
      }
    }
  }
}

function checkCollisions(x1, y1, x2, y2, d) {
  // A stands for index of asteroid
  // collision of asteroid and laser
  var distance = dist(x1, y1, x2, y2); // distance between asteroid and laser
  if (distance <= d) {
    // checks if distance is within diameter of asteroid
    score += 50;
    return true;
  }
  return false;
}

function gameOver() {
  if (lives == 0) {
    textSize(64);
    noFill();
    stroke(255);
    strokeWeight(1.5);
    text("GAME OVER", width / 2 - 170, height / 2 - 100);

    textSize(32);
    noFill();
    stroke(255);
    strokeWeight(1.5);
    text("PLAY AGAIN", width / 2 - 65, height / 2 + 50);
    return true;
  }
  return false;
}
