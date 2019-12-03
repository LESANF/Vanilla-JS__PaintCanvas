const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange"); // input
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x =
    event.offsetX ||
    event.touches[0].pageX - event.touches[0].target.offsetLeft;
  const y =
    event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
// painting이 false일 경우 if문 실행 true면 else문 실행
//경로를 만들기위한 첫번째 단계
// 펜을 x, y로 지정된 좌표로 옮김.
// 현재 드로잉위치에서 x,y로 지정된 위치까지 선을 그림.
//윤곽선을 이용하여 도형을 그림.

function handleRangeChange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  // canvas가 있을때 아래의 event실행
  canvas.addEventListener("mousemove", onMouseMove); // 캔버스위에 마우스를 올렸을 때, onMouseMove함수 실행
  canvas.addEventListener("mousedown", startPainting); // 캔버스위에 마우스를 눌렀을 때, startPainting함수 실행
  canvas.addEventListener("mouseup", stopPainting); // 캔버스위에서 마우스를 눌렀다 땠을때, stopPainting함수 실행
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스에서 마우스커서가 벗어 났을때, stopPainting함수 실행
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchleave", stopPainting);
  canvas.addEventListener("touchcancel", stopPainting);
}

Array.from(colors).forEach(function(color) {
  color.addEventListener("click", handleColorClick);
}); // forEach(color => color.addEventListener("click", handleColorClick) 과 같은의미
//  es6에서 제공하는 간소화하는 방법이다.

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
