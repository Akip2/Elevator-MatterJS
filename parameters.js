const width=800;
const height=1600;

let elevatorWidth=35;
let elevatorHeight=70;
let maxSpeed=4;
let minSpeed=1;

let stageSize=20;
let stageSpacing=120;

let gravity=0.98;

function getParameters(){
    elevatorWidth=Number(document.querySelector("#elevator-width").value);
    elevatorHeight=Number(document.querySelector("#elevator-height").value);
    maxSpeed=Number(document.querySelector("#elevator-maxSpeed").value);
    minSpeed=Number(document.querySelector("#elevator-minSpeed").value);

    stageSize=Number(document.querySelector("#stage-size").value);
    stageSpacing=Number(document.querySelector("#stage-spacing").value);

    gravity=Number(document.querySelector("#gravity").value);
}

export{
    width,
    height,
    elevatorWidth,
    elevatorHeight,
    stageSize,
    stageSpacing,
    gravity,
    maxSpeed,
    minSpeed,
    getParameters
}