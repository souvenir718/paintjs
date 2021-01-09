const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

// canvas에는 pixel modifer에 사이즈를 줘야 한다.
// pixel을 다루는 윈도우에 크기를 알려줘야 한다.
canvas.width = 700;
canvas.height = 700;

//선의 색, 두께
ctx.strokeStyle= "#2c2c2c";
ctx.lineWidth = 2.5;

// canvas는 context를 갖고 그 context 안에 픽셀을 다룬다.
let painting = false;
// clientX, clientY : 전체 창 위의 좌표
// offsetX, offsetY : canvas 위의 좌표

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

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}