const width=800;
const height=1600;

let elevatorWidth=35;
let elevatorHeight=70;

let stageSize=20;
let stageSpacing=120;

function getParameters(){
    elevatorWidth=Number(document.querySelector("#elevator-width").value);
    elevatorHeight=Number(document.querySelector("#elevator-height").value);

    stageSize=Number(document.querySelector("#stage-size").value);
    stageSpacing=Number(document.querySelector("#stage-spacing").value);
}

export{
    width,
    height,
    elevatorWidth,
    elevatorHeight,
    stageSize,
    stageSpacing,
    getParameters
}