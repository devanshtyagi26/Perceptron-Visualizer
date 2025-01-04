function Activation_Function_sign(n) {
  if (n >= 0) {
    return 1;
  } else {
    return -1;
  }
}

class Perceptron {
  constructor(lr) {
    this.weights = Array(2);
    this.learningRate = lr;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  guess(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    let output = Activation_Function_sign(sum);
    return output;
  }

  train(inputs, target) {
    let guess = this.guess(inputs);
    let error = target - guess;

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  }
}

export default Perceptron;
