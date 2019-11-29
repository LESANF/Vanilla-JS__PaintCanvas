const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // canvas 위에서 움직일 때
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting이 false일 경우 if문 실행 true면 else문 실행
    ctx.beginPath(); //경로를 만들기위한 첫번째 단계
    ctx.moveTo(x, y); // 펜을 x, y로 지정된 좌표로 옮김.
  } else {
    ctx.lineTo(x, y); // 현재 드로잉위치에서 x,y로 지정된 위치까지 선을 그림.
    ctx.stroke(); //윤곽선을 이용하여 도형을 그림.
  }
}

function onMouseDown(event) {
  // 마우스버튼을 눌렀을 때.
  painting = true;
}

if (canvas) {
  // canvas가 있을때 아래의 event실행
  canvas.addEventListener("mousemove", onMouseMove); // 캔버스위에 마우스를 올렸을 때, onMouseMove함수 실행
  canvas.addEventListener("mousedown", startPainting); // 캔버스위에 마우스를 눌렀을 때, startPainting함수 실행
  canvas.addEventListener("mouseup", stopPainting); // 캔버스위에서 마우스를 눌렀다 땠을때, stopPainting함수 실행
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스에서 마우스커서가 벗어 났을때, stopPainting함수 실행
}
