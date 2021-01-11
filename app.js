const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

// canvas에는 pixel modifer에 사이즈를 줘야 한다.
// pixel을 다루는 윈도우에 크기를 알려줘야 한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//선의 색, 두께

ctx.fillStyle = "white";
ctx.fillRect(0, 0, "white", "white");
ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillStyle = "green"
// ctx.fillRect(x, y, 가로, 세로);

// canvas는 context를 갖고 그 context 안에 픽셀을 다룬다.
let painting = false;
// clientX, clientY : 전체 창 위의 좌표
// offsetX, offsetY : canvas 위의 좌표

let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){ // 클릭하지 않고 움직였을 때.
        // console.log("creating path in ", x,y);
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else { // 클릭하면서 움직일 때 선을 그린다.
        // console.log("creating line in ", x,y);
        ctx.lineTo(x,y); // path의 전 위치에서 지금 위치까지 선을 만든다.
        ctx.stroke(); // 획을 긋는다. path는 line
    }
}

function onMouseDown(event){
    painting = true;
    // console.log(painting);
}

// function onMouseUp(event){
//     stopPainting();
//     // console.log(painting);
// } //-> stopPainting()으로 대체

// function onMouseLeave(event){
//     painting = false;
//     // console.log(painting);
// } //-> stopPainting()으로 대체

function handleColorClick(event) {
    // console.log(event.target.style.backgroundColor);
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
    const size = event.target.value;

    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    // canvasAPI - toDataURL()
    const image = canvas.toDataURL();
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "From PaintJS";
    // download는 a태그의 attribute
    // console.log(link);
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

// console.log(Array.from(colors));

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}