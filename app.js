const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;//canvas크기 설정
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";//첫번째 색 
ctx.lineWidth = 2.5;//크기 조절 

let painting = false;

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
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); //캔버스에 벗어났을때
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
    );