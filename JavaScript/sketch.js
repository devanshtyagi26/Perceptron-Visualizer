import Perceptron from "./perceptron.js";
import Point from "./training.js";
import { f } from "./training.js";

let trainingIndex = 0;
let canvasWidth = 435;
let canvasHeight = 435;
let isCanvasActive = false;
let mValue, cValue;
let canvas;
let points = [];
let master;
let img;
const popupOverlay = document.getElementById("popupOverlay");
const closeBtn = document.querySelector(".closeBtn");

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

    document.querySelector(".neuronBox").scrollIntoView({ behavior: "smooth" });

    if (
      isNaN(learningRate) ||
      isNaN(NumOfPoints) ||
      isNaN(window.mValue) ||
      isNaN(window.cValue)
    ) {
      console.log("Invalid input values. Please check the form.");
    }
    // Show canvas container and activate canvas
    document.getElementById("canvasContainer").style.display = "flex";
    img = loadImage("../Assets/g2.svg"); // Replace with your image URL
    // Create canvas in setup and attach to the DOM container
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvasContainer"); // Attach canvas to #canvasContainer

    canvas.style("border", "0.1px solid rgba(255, 255, 255, 0.36)");
    canvas.style("box-shadow", "8px 8px 21px black");
    canvas.style("border-radius", "15px");

    document.querySelector("#graphImg").style.visibility = "hidden";
    // Remove the <main> tag if it exists
    let mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.remove(); // This removes the <main> tag
    }

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

let trainingEpoch = 0; // To track how many epochs have passed
let weightsChanged = true; // To check if weights have changed

window.draw = function () {
  if (!isCanvasActive) {
    return; // Don't execute draw until the form is submitted
  }

  if (!weightsChanged) {
    // Stop training if weights have not changed
    noLoop(); // Stop the draw loop
    console.log(trainingEpoch);
    const w0 = document.querySelector("#weighta").innerHTML;
    const w1 = document.querySelector("#weightb").innerHTML;
    const w2 = document.querySelector("#weightc").innerHTML;
    const i0 = document.querySelector("#input1").innerHTML;
    const i1 = document.querySelector("#input2").innerHTML;
    const i2 = document.querySelector("#input3").innerHTML;
    popupOverlay.style.display = "flex";
    document.querySelector("#popupinput1").innerHTML = i0;
    document.querySelector("#popupinput2").innerHTML = i1;
    document.querySelector("#popupinput3").innerHTML = i2;
    document.querySelector("#popupweighta").innerHTML = w0;
    document.querySelector("#popupweightb").innerHTML = w1;
    document.querySelector("#popupweightc").innerHTML = w2;
    return;
  }

  // background(220);
  image(img, 0, 0, width, height);
  stroke(0);

  if (!window.points || window.points.length === 0) {
    console.error("Points array is not initialized.");
    return;
  }

  // Draw target line
  window.p1 = new Point(-1, f(-1, window.mValue, window.cValue));
  window.p2 = new Point(1, f(1, window.mValue, window.cValue));
  stroke(210, 161, 33);
  strokeWeight(1.5);
  line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());

  // Draw perceptron line
  window.p3 = new Point(-1, master.guessY(-1));
  window.p4 = new Point(1, master.guessY(1));
  stroke(142, 50, 226); // Line color: Red
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
    trainingEpoch++;
    console.log(`Epoch ${trainingEpoch} completed.`);

    // Check if weights changed during the epoch
    weightsChanged = master.didWeightsChange();
  }
};

// Function to clear all variables
function clearCanvasVariables() {
  isCanvasActive = false;
  points = [];
  trainingIndex = 0;
  mValue = undefined;
  cValue = undefined;
  trainingEpoch = 0; // To track how many epochs have passed
  weightsChanged = true;
  // Hide the canvas container
  document.getElementById("canvasContainer").style.display = "none";
  document.querySelector("#graphImg").style.visibility = "visible";

  // Remove any existing canvas
  if (canvas) {
    canvas.remove();
  }

  master = null;
  loop();
}

document.getElementById("resetButton").addEventListener("click", function () {
  resetEverything();
});

function resetEverything() {
  // Clear previous canvas and points
  clearCanvasVariables();

  // Optionally reset form values or leave them as is
  document.getElementById("canvasForm").reset(); // This will reset the form inputs if needed

  // Disable the canvas
  isCanvasActive = false;

  // Optionally hide the canvas container again
  document.getElementById("canvasContainer").style.display = "block";

  // Any other global variables you want to reset
  points = [];
  trainingIndex = 0;
  trainingEpoch = 0;
  weightsChanged = true;

  // Optionally reset the UI elements like output or other dynamic content
  document.querySelector("#output").innerHTML = "-0.000";

  document.querySelector("#i1").innerHTML = "-0.000";
  document.querySelector("#i2").innerHTML = "-0.000";
  document.querySelector("#i3").innerHTML = "-0.000";
  document.querySelector("#input1").innerHTML = "-0.00000000000000";
  document.querySelector("#input2").innerHTML = "-0.00000000000000";
  document.querySelector("#input3").innerHTML = "-0.00000000000000";

  document.querySelector("#weighta").innerHTML = "-0.00000000000000";
  document.querySelector("#weightb").innerHTML = "-0.00000000000000";
  document.querySelector("#weightc").innerHTML = "-0.00000000000000";

  document.querySelector("#weightaShort").innerHTML = "-0.000";
  document.querySelector("#weightbShort").innerHTML = "-0.000";
  document.querySelector("#weightcShort").innerHTML = "-0.000";
  document.querySelector("#summationa").innerHTML = "-0.00000000000000";
  document.querySelector("#summationaShort").innerHTML = "-0.000";

  let change = document.querySelectorAll(".stepa");
  change[0].innerHTML = "-0.000";
  change[1].innerHTML = "-0.00000000000000";

  // Log or alert that everything has been reset
  console.log("Everything has been reset.");
}

export { mValue, cValue };
