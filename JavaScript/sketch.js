import Perceptron from "./perceptron.js";
import Point from "./training.js";

let trainingIndex = 0;

let canvasWidth = 500;
let canvasHeight = 500;
// let learningRate = 0.01;
let isCanvasActive = false;

// Function to handle form submission
document
  .getElementById("canvasForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    clearCanvasVariables();

    window.learningRate = document.getElementById("lr").value;
    window.NumOfPoints = document.getElementById("points").value;

    // Show canvas container after form submission
    document.getElementById("canvasContainer").style.display = "block";

    // Create canvas with specified width and height
    createCanvas(canvasWidth, canvasHeight);

    window.master = new Perceptron(learningRate);
    window.points = Array(int(NumOfPoints));
    console.log(points);

    for (let i = 0; i < points.length; i++) {
      points[i] = new Point();
    }

    let inputs = [-1, 0.5];

    // Activate the canvas by setting the flag to true
    isCanvasActive = true;
  });

window.setup = function () {
  document.getElementById("canvasContainer").style.display = "none";
};

window.draw = function () {
  if (!isCanvasActive) {
    return; // Don't execute draw until the form is submitted
  }
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

// Function to clear all variables
function clearCanvasVariables() {
  // Reset variables to initial values
  canvasWidth = 500;
  canvasHeight = 500;
  isCanvasActive = false;
  points = [];
  trainingIndex = 0;

  // Optionally, clear the canvas container or reset any other elements
  document.getElementById("canvasContainer").style.display = "none";

  // Remove any existing canvas
  if (canvas) {
    canvas.remove();
  }
}
