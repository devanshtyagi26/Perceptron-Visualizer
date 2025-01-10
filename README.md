# Interactive Single-Layer Perceptron (Perceptron Playground)

[Watch the video](./Assets/Demo%20Video/Demo.mp4)

Welcome to the **Interactive Single-Layer Perceptron** project! This tool is a visually intuitive and interactive implementation of a perceptron, designed to classify points based on a linear decision boundary. It provides real-time feedback on the learning process, making it a great resource for understanding the fundamentals of machine learning.

## Features

- **Dynamic Visualization**: Watch the perceptron adjust its decision boundary in real time during the training process.
- **Customizable Parameters**: Easily modify parameters such as learning rate, number of points, and the target line equation.
- **User-Friendly Interface**: An interactive canvas for adding or removing points and visualizing their classifications.
- **Incremental Training**: Train the perceptron step-by-step to observe how it converges toward the solution.

---

## How It Works

The perceptron is a simple linear classifier that adjusts its weights based on the classification error. Here's a breakdown of how the project operates:

1. **Point Generation**:

   - Random points are generated on a 2D canvas.
   - Each point is labeled based on its position relative to a user-defined target line.

2. **Perceptron Training**:

   - The perceptron updates its weights incrementally using the perceptron learning rule:
   - <img src="https://latex.codecogs.com/gif.latex?
     \mathbf{w} \leftarrow \mathbf{w} + \eta (y - \hat{y}) \mathbf{x}" />

     where:

     - \( <img src="https://latex.codecogs.com/gif.latex?\mathbf{w} " /> \): weight vector
     - \( <img src="https://latex.codecogs.com/gif.latex?\eta " /> \): learning rate
     - \( <img src="https://latex.codecogs.com/gif.latex?y " /> \): actual label
     - \( <img src="https://latex.codecogs.com/gif.latex?\hat{y} " /> \): predicted label
     - \( <img src="https://latex.codecogs.com/gif.latex?\mathbf{x} " />\): input vector

3. **Visualization**:
   - The decision boundary is updated dynamically to reflect the perceptron's learning progress.
   - Misclassified points are highlighted, providing a clear view of the errors being corrected.

---

## Usage

1. **Set Parameters**:

   - Use the form inputs to define:
     - Learning rate
     - Number of points
     - Equation of the target line

2. **Train the Perceptron**:
   - Click the "Submit" button to incrementally adjust the perceptron's weights.
   - Observe the decision boundary shift as the perceptron learns.

---

## Demo

Check out the live demo here: [Live Demo](https://perceptron-playground.vercel.app/)

---

## Future Enhancements

- Add support for multi-class classification.
- Implement batch training for faster convergence.
- Include a step-by-step tutorial overlay for first-time users.

---

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

---

Feel free to explore, learn, and have fun with this interactive tool! 🚀
