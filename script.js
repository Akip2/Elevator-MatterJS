import { initializeModel } from "./model.js";
import { Elevator } from "./elevator.js";

import { engine, Render,Runner,Bodies,Composite} from "./physics.js";

import { width, height, stageSize, stageSpacing, elevatorHeight, elevatorWidth } from "./parameters.js";



const runner = Runner.create();

const canvas=document.querySelector("#stage");

const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: "green"
  }
});

const objects=[];

function createWalls(elevatorWidth){
  const wallSize=width/2-elevatorWidth;

  const wall1 = Bodies.rectangle(wallSize/2, height/2, wallSize, height, { 
    isStatic: true,
    render: {
      fillStyle : "black"
    }
  });
  
  const wall2 = Bodies.rectangle(width-wallSize/2, height/2, wallSize, height, {
    isStatic: true,
    render: {
      fillStyle : "black"
    }
  });

  objects.push(wall1);
  objects.push(wall2);
}

function createStages(elevatorWidth, elevatorHeight, stageHeight, spacing){
  let stagePositions=[]

  let currentHeigh=height-stageHeight;
  const ground = Bodies.rectangle(width / 2, currentHeigh+stageHeight/2, width, stageHeight, {
    isStatic: true,
    render: {
      fillStyle: "black"
    }
  });
  objects.push(ground);

  let nextHeight=currentHeigh-spacing-stageHeight;

  stagePositions.push(currentHeigh);

  while(nextHeight-elevatorHeight>=0){
    currentHeigh=nextHeight;
    stagePositions.push(currentHeigh);

    const left=Bodies.rectangle(width/2-(width+elevatorWidth*3.5)/4, currentHeigh+stageHeight/2, (width+elevatorWidth)/2, stageHeight, {
      isStatic: true,
      render: {
        fillStyle: 'black',
      }
    });

    const right=Bodies.rectangle(width/2+(width+elevatorWidth*3.5)/4, currentHeigh+stageHeight/2, (width+elevatorWidth)/2, stageHeight, {
      isStatic: true,
      render: {
        fillStyle: 'black',
      }
    });

    objects.push(left);
    objects.push(right);

    nextHeight=currentHeigh-spacing-stageHeight;
  }

  return stagePositions;
}

function createElevator(elevatorWidth, elevatorHeight){
  const elevator=Bodies.rectangle(width/2, height-elevatorHeight/2, elevatorWidth, elevatorHeight, {
    render: {
      fillStyle: 'darkblue',
    }
  });
  objects.push(elevator);

  return elevator;
}


createWalls(elevatorWidth);
let stagesPos=createStages(elevatorWidth, elevatorHeight, stageSize, stageSpacing);
let elevatorObj=createElevator(elevatorWidth, elevatorHeight);

Composite.add(engine.world, objects);


initializeModel(elevatorObj, stagesPos);

Render.run(render);
Runner.run(runner, engine);


const elevator=new Elevator(elevatorObj);

let btnContainer=document.querySelector("#btn-container");
for(let i=0; i<stagesPos.length; i++){
  btnContainer.innerHTML=`<button>${i}</button>`+btnContainer.innerHTML;
}

btnContainer.addEventListener("click", (event)=>{
  let stageNumber=event.target.innerText;

  if(elevator.currentStage!=stageNumber && !elevator.isMoving){
    elevator.goToStage(stageNumber);
  }
})