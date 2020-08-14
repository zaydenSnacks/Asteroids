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
 *    key
 *    strokeWeight
 *    asteroids
 */
class asteroid {
  constructor(x = random(width), y = random(height), r = random(30, 70)) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.masterXvelocity = random(-2, 2);
    this.masterYvelocity = random(-2, 2);
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x > width + this.r) {
      this.x = -this.r; // crosses edge and comes out other side
    }
    if (this.x < -this.r) {
      this.x = width + this.r;
    }
    if (this.y > height + this.r) {
      this.y = -this.r;
    }
    if (this.y < -this.r) {
      this.y = height + this.r;
    }
  }

  split(index) {
    // if the asteroid gets hit by laser
    var half = asteroids[index].r / 2;
    var x = asteroids[index].x - 5;
    var y = asteroids[index].y - 5;
    if (half < 8) {
      asteroids.splice(index, 1);
    } else {
      asteroids.splice(
        index,
        1,
        new asteroid(asteroids[index].x, asteroids[index].y, half),
        new asteroid(x, y, half)
      );
    }
  }

  display() {
    noFill();
    stroke(255);
    ellipse(this.x, this.y, this.r * 2);
  }
}
