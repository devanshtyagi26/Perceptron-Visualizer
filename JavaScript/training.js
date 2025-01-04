class Point {
  constructor() {
    this.x;
    this.y;
    this.label;
    this.x = random(width);
    this.y = random(height);

    if (this.x > this.y) {
      this.label = 1;
    } else {
      this.label = -1;
    }
  }

  show() {
    stroke(0);
    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, 8, 8);
  }
}

export default Point;
