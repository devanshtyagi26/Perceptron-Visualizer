import Perceptron from "./perceptron.js";
import Point from "./training.js";

let trainingIndex = 0;
let canvasWidth = 500;
let canvasHeight = 500;
let isCanvasActive = false;
let mValue, cValue;
let canvas;
let points = [];
let master;

function f(x, m, c) {
  return (m / 10) * x + c / 10;
}

// Function to handle form submission
document
  .getElementById("canvasForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    clearCanvasVariables();

    // Parse and validate form input values
    window.learningRate = parseFloat(document.getElementById("lr").value);
    window.NumOfPoints = parseInt(document.getElementById("points").value);
    window.mValue = parseFloat(document.querySelector("#m").value);
    window.cValue = parseFloat(document.querySelector("#c").value);

    if (
      isNaN(learningRate) ||
      isNaN(NumOfPoints) ||
      isNaN(window.mValue) ||
      isNaN(window.cValue)
    ) {
      console.log("Invalid input values. Please check the form.");
    }
    // Show canvas container and activate canvas
    document.getElementById("canvasContainer").style.display = "block";
    // Create canvas in setup and attach to the DOM container
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvasContainer"); // Attach canvas to #canvasContainer
    // Initialize Perceptron and Points
    master = new Perceptron(learningRate);
    window.points = Array.from(
      { length: parseInt(NumOfPoints) },
      () => new Point()
    );

    trainingIndex = 0;

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

  if (!window.points || window.points.length === 0) {
    console.error("Points array is not initialized.");
    return;
  }

  // Draw target line
  window.p1 = new Point(-1, f(-1, window.mValue, window.cValue));
  window.p2 = new Point(1, f(1, window.mValue, window.cValue));
  line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());

  // Draw perceptron line
  window.p3 = new Point(-1, master.guessY(-1));
  window.p4 = new Point(1, master.guessY(1));
  line(p3.getPixelX(), p3.getPixelY(), p4.getPixelX(), p4.getPixelY());

  // Show points
  for (let pt of window.points) {
    pt.show();
  }

  for (let pt of window.points) {
    let inputs = [pt.x, pt.y, pt.bias];
    let target = pt.label;
    let guess = master.guess(inputs);
    if (guess == target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(pt.getPixelX(), pt.getPixelY(), 4, 4);
  }
  if (typeof trainingIndex === "undefined") {
    console.error("trainingIndex is undefined.");
    trainingIndex = 0; // Reset to 0 if undefined
  }
  // Train perceptron on current point
  let training = window.points[trainingIndex];
  let inputs = [training.x, training.y, training.bias];
  let target = training.label;
  master.train(inputs, target);
  trainingIndex++;

  if (trainingIndex >= window.points.length) {
    trainingIndex = 0;
  }
};

// Function to clear all variables
function clearCanvasVariables() {
  isCanvasActive = false;
  points = [];
  trainingIndex = 0;
  mValue = undefined;
  cValue = undefined;

  // Hide the canvas container
  document.getElementById("canvasContainer").style.display = "none";

  // Remove any existing canvas
  if (canvas) {
    canvas.remove();
  }
}

export { mValue, cValue };
