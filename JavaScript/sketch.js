import Perceptron from "./perceptron.js";
import Point from "./training.js";

let canvas;
let points = Array(100);
let trainingIndex = 0;

window.setup = function () {
  window.master = new Perceptron();
  canvas = createCanvas(500, 500);
  canvas.id("canvas");

  for (let i = 0; i < points.length; i++) {
    points[i] = new Point();
  }

  let inputs = [-1, 0.5];
  let guess = master.guess(inputs);
};

window.draw = function () {
  background(220);

  stroke(0);
  line(0, 0, width, height);

  for (let pt of points) {
    pt.show();
  }
  for (let pt of points) {
    let inputs = [pt.x, pt.y];
    let target = pt.label;

    let guess = master.guess(inputs);
    if (guess == target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(pt.x, pt.y, 4, 4);
  }

  let training = points[trainingIndex];
  let inputs = [training.x, training.y];
  let target = training.label;
  master.train(inputs, target);
  trainingIndex++;

  if (trainingIndex == points.length) {
    trainingIndex = 0;
  }
};