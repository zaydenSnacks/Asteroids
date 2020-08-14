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
 *    spaceShip, strokeWeight
 *    push, pop, point
 *    lasers
 */

class bullet {
  constructor(vector, angle) {
    this.angle = angle;
    this.vector = createVector(vector.x, vector.y);
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(10);

    this.edge = function edges() {
      if (this.vector.x > width) {
        //this.vector.x = 0;
        return true;
      }
      if (this.vector.x < 0) {
        //this.vector.x = width;
        return true;
      }
      if (this.vector.y > height) {
        //this.vector.y = 0
        return true;
      }
      if (this.vector.y < 0) {
        //this.vector.y = height;
        return true;
      }
      return false;
    };
  }

  update(i) {
    this.vector.add(this.vel);
    if (lasers[i].edge()) {
      lasers.splice(i, 1);
      console.log("lasers: " + lasers.length);
    }
  }

  move() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.vector.x, this.vector.y);
    pop();
  }
}
