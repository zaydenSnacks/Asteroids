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
 *    createVector, player
 *    cos, sin, p5
 *    asteroid1, asteroid2, asteroid3, asteroid4, asteroids,
 *    push, pop, this.hits, r,
 */

class spaceShip {
  constructor() {
    // useful variables
    this.x = (windowWidth - 20) / 2;
    this.y = (windowHeight - 20) / 2;
    this.point = 10;
    this.angle = 0;

    // triangle points
    this.vector1 = createVector(0, 0);
    this.vector = createVector(this.x, this.y);
    this.ship = triangle(
      -this.point,
      this.point,
      this.point,
      this.point,
      0,
      -this.point
    );

    // collision circle
    this.r = 15;
    this.circ = circle(this.vector.x - 3, this.vector.y, this.r);

    this.move = function keyPressed() {
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        // used for moving forward (where ever the top point in triangle is facing, moves in that direction)

        var thrust = p5.Vector.fromAngle(this.angle);
        thrust.mult(0.07);
        this.vector1.add(thrust);
      }
      if (keyIsDown(LEFT_ARROW)|| keyIsDown(65)) {
        // used to rotate ship to the left
        this.angle += -0.07;
      }
      if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) {
        // used to rotate ship to the right
        this.angle += 0.07;
      }
    };
  }

  update() {
    this.vector1.mult(1.03);
    this.vector.add(this.vector1);
    player.edges();
  }

  show() {
    push();
    this.vector1.mult(0.95);
    this.vector.add(this.vector1);
    translate(this.vector.x, this.vector.y);
    rotate(this.angle + PI / 2);
    noFill();
    stroke(255);
    this.ship = triangle(
      -this.point,
      this.point,
      this.point,
      this.point,
      0,
      -this.point
    );
    pop();
    noStroke();
    this.circ = circle(this.vector.x - 3, this.vector.y, this.r);
  }

  edges() {
    if (this.vector.x > width + this.point) {
      this.vector.x = -this.point;
    }
    if (this.vector.x < -this.point) {
      this.vector.x = width + this.point;
    }
    if (this.vector.y > height + this.point) {
      this.vector.y = -this.point;
    }
    if (this.vector.y < -this.point) this.vector.y = height + this.point;
  }
}
