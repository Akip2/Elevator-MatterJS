import { model } from "./model.js";
import { elevatorHeight } from "./parameters.js";

class Camera{
    getElevatorPos(){
        return model.elevator.position.y+elevatorHeight/2;
    }

    getStagePos(number){
        return model.stages[number];
    }
}

export let cam=new Camera();