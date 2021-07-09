const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;//canvas크기 설정
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";//배경색이 있게 저장되도록
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = "INITAL_COLOR";//첫번째 색 
ctx.fillStyle = "INITAL_COLOR";
ctx.lineWidth = 2.5;//크기 조절 

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){//모든 움직임을 감지
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){//경로를 만든다.
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{//그린다.
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;

}

function onMouseUp(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;//클릭한 색들로 변하게 지시
    ctx.fillStyle = color;//채우기 색 조절
}

function handleRangeChange(event){//봇 사이즈 조정
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){//채우기 기능
    if(filling === true){//버튼을 변경
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();//위클릭 방지

}

function handleSaveClick(){//저장 기능
    const image = canvas.toDataUrl();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image_fromEunPaint";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); //캔버스에 벗어났을때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}