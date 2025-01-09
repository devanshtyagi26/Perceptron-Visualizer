class Perceptron {
  constructor(lr) {
    if (isNaN(lr) || typeof lr !== "number") {
      console.error("Invalid learning rate:", lr);
      throw new Error("Learning rate must be a valid number.");
    }

    this.learningRate = lr;

    // Initialize weights with random values between -1 and 1
    this.weights = Array(3)
      .fill(0)
      .map(() => Math.random() * 2 - 1); // Random numbers between -1 and 1

    this.previousWeights = [...this.weights]; // Keep track of the previous weights
  }

  // Activation function (sign function)
  static Activation_Function_sign(n) {
    if (n >= 0) {
      return 1;
    } else {
      return -1;
    }
  }

  // The 'guess' function that makes predictions based on inputs
  guess(inputs) {
    if (!Array.isArray(inputs) || inputs.length !== 3) {
      console.error(
        "Invalid inputs for guess. Expected an array of length 3:",
        inputs
      );
      throw new Error("Inputs must be an array of length 3.");
    }
    let sum = 0;

    for (let i = 0; i < this.weights.length; i++) {
      if (isNaN(inputs[i]) || isNaN(this.weights[i])) {
        console.error(
          "Invalid input or weight during guess:",
          inputs[i],
          this.weights[i]
        );
        throw new Error("Inputs or weights contain invalid values.");
      }
      sum += inputs[i] * this.weights[i];
    }

    const w0 = this.weights[0];
    const w1 = this.weights[1];
    const w2 = this.weights[2];
    const i0 = inputs[0];
    const i1 = inputs[1];
    const i2 = inputs[2];
    document.querySelector("#i1").innerHTML = float(i0).toFixed(3);
    document.querySelector("#i2").innerHTML = float(i1).toFixed(3);
    document.querySelector("#i3").innerHTML = i2 + ".000";
    document.querySelector("#input1").innerHTML = i0;
    document.querySelector("#input2").innerHTML = i1;
    document.querySelector("#input3").innerHTML = i2 + ".000";
    document.querySelector("#weighta").innerHTML = w0;
    document.querySelector("#weightb").innerHTML = w1;
    document.querySelector("#weightc").innerHTML = w2;
    document.querySelector("#weightaShort").innerHTML = float(w0).toFixed(3);
    document.querySelector("#weightbShort").innerHTML = float(w1).toFixed(3);
    document.querySelector("#weightcShort").innerHTML = float(w2).toFixed(3);
    document.querySelector("#summationa").innerHTML = sum;
    document.querySelector("#summationaShort").innerHTML =
      float(sum).toFixed(3);
    return Perceptron.Activation_Function_sign(sum);
  }

  // The 'guessY' function to get the 'y' value for a given 'x' value
  guessY(x) {
    // Calculate slope (m) and intercept (b) from weights
    let m = this.weights[0] / this.weights[1]; // m = w0 / w1
    let b = this.weights[2] / this.weights[1]; // b = w2 / w1

    // Return the y value of the decision boundary line for a given x
    return -m * x - b;
  }

  didWeightsChange() {
    // Compare the current weights to the previous weights
    for (let i = 0; i < this.weights.length; i++) {
      if (this.weights[i] !== this.previousWeights[i]) {
        this.previousWeights = [...this.weights]; // Update the previous weights
        return true; // Weights have changed
      }
    }
    return false; // No change in weights
  }

  // Training function to adjust weights based on inputs and target
  train(inputs, target) {
    if (!Array.isArray(inputs) || inputs.length !== 3) {
      console.error(
        "Invalid inputs for training. Expected an array of length 3:",
        inputs
      );
      throw new Error("Inputs must be an array of length 3.");
    }

    if (isNaN(target) || typeof target !== "number") {
      console.error("Invalid target for training:", target);
      throw new Error("Target must be a valid number.");
    }

    let guess = this.guess(inputs);
    let change = document.querySelectorAll(".stepa");
    change[0].innerHTML = guess + ".000";
    change[1].innerHTML = guess + ".000";
    let error = target - guess;
    if (isNaN(error)) {
      console.error("Error is NaN during training:", error);
      throw new Error("Error must be a valid number.");
    }

    for (let i = 0; i < this.weights.length; i++) {
      if (isNaN(inputs[i]) || isNaN(this.learningRate)) {
        console.error(
          "Invalid input or learning rate during training:",
          inputs[i],
          this.learningRate
        );
        throw new Error("Inputs or learning rate contain invalid values.");
      }

      // Update weights based on the error and inputs
      this.weights[i] += error * inputs[i] * this.learningRate;

      if (isNaN(this.weights[i])) {
        console.error("Weight update resulted in NaN:", this.weights[i]);
        throw new Error("Weights must not become NaN.");
      }
    }
  }
}

export default Perceptron;
