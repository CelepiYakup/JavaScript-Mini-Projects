let colors = ["#d72631", "#a2d5c6", "#077b8a", "#5c3c92"];

let boxes = document.querySelectorAll(".row div");

let btn = document.getElementById("btn");

let shapes = [
  "star",
  "rhombus",
  "frame",
  "quad-circle",
  "random-shape-1",
  "random-shape-2",
  "random-shape-3",
  "triangle",
  "circle",
];

let generatePattern = () => {
  boxes.forEach((box) => {
    box.className = "";
    let i = Math.floor(Math.random() * shapes.length);
    let j = Math.floor(Math.random() * colors.length);
    box.classList.add(shapes[i]);
    box.style.backgroundColor = colors[j];
  });
};

btn.addEventListener("click", generatePattern);
window.addEventListener("load", generatePattern);
