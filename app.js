const canvas = document.getElementById("jsCanvas");
const color = document.querySelectorAll(".color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const INITIAL_COLOR = "#2c2c2c";

//context default
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//start drawing
let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//drawing
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//change color
function changeColor(event) {
  const bg_color = event.target.style.backgroundColor;
  ctx.strokeStyle = bg_color;
  ctx.fillStyle = bg_color;
}
color.forEach((colors) => colors.addEventListener("click", changeColor));

//impact colors
Array.from(color).forEach((colors) => {
  colors.addEventListener("click", () => {
    Array.from(color).map((c) => c.classList.remove("active"));
    colors.classList.toggle("active");
  });
});

//click and filling
function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//change stroke size
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//fill
let filling = false;

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

//우클릭 방지용
function handleCM(event) {
  event.preventDefault();
}

//image save
function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
