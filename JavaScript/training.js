function f(x, m, c) {
  return (m / 10) * x + c / 10;
}

class Point {
  constructor(x_ = undefined, y_ = undefined, bias = 1) {
    // If x_ and y_ are not provided, generate random values
    if (x_ === undefined || y_ === undefined) {
      this.x = random(-1, 1);
      this.y = random(-1, 1);
    } else {
      this.x = x_;
      this.y = y_;
    }

    // Set the label based on x and y values
    let lineY = f(this.x, window.mValue, window.cValue);
    if (this.y > lineY) {
      this.label = 1;
    } else {
      this.label = -1;
    }

    // Assign the bias (default is 1 if not provided)
    this.bias = bias;
  }

  getPixelX() {
    return map(this.x, -1, 1, 0, width);
  }

  getPixelY() {
    return map(this.y, -1, 1, height, 0);
  }

  show() {
    stroke(0);
    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }

    let px = this.getPixelX();
    let py = this.getPixelY();
    ellipse(px, py, 8, 8);
  }
}

export {f};
export default Point;
