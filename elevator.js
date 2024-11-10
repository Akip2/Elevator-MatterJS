import { cam } from "./camera.js";
import { Body, engine } from "./physics.js";

export class Elevator{
    constructor(object){
        this.object=object;
        this.motorActive=false;
        this.motorForce=0;
        this.currentMotorForce=0;
        this.currentStage=0;

        this.isMoving=false;
    }

    goToStage(number){
        this.isMoving=true;

        let stagePos=cam.getStagePos(number);

        let delta=stagePos-cam.getElevatorPos();
        this.activateMotor();

        let direction;
        if (delta < 0) {
            direction=-1;
        } else {
            direction=0.5;
        }
    
        const intervalId = setInterval(() => {
            delta = Math.abs(stagePos - cam.getElevatorPos());
            
            if (delta<=5) {
                this.currentStage=number;

                if(this.currentStage>0){
                    this.stabiliseElevator(stagePos);
                }
                else{
                    this.stopMotor();
                }
                
                this.isMoving=false;
                clearInterval(intervalId);
            }
            else{
                delta=Math.abs(delta);

                let force=0.5+delta/180;

                this.setMotorForce(force*direction);
            }
        }, 10); 
    }

    activateMotor(){
        if(!this.motorActive){
            this.adjustMotorForce();
            this.motorActive=true;

            const intervalId = setInterval(() => {
                Body.setVelocity(this.object, {x:0, y:this.currentMotorForce});
                
                if (!this.motorActive) {
                    clearInterval(intervalId);
                }
            }, 10); 
        }
    }

    adjustMotorForce(){
        const step=0.01;

        const intervalId = setInterval(() => {
            let delta=this.currentMotorForce-this.motorForce;

            if(delta>=step || delta<=-step){
                if(delta<0){
                    this.currentMotorForce+=step;
                }
                else{
                    this.currentMotorForce-=step;
                }
            }
 
            if (!this.motorActive) {
                clearInterval(intervalId);
            }
        }, 10); 
    }

    setMotorForce(force){
        this.motorForce=force;
    }

    stopMotor(){
        this.motorActive=false;
        this.motorForce=0;
    }

    stabiliseElevator(position){
        const accuracy=0.35;
        
        const intervalId = setInterval(() => {
            let delta=position-cam.getElevatorPos();
            if(delta>=accuracy || delta<=-accuracy){
                if(delta<0){
                    this.setMotorForce(-0.45);
                }
                else{
                    this.setMotorForce(0.05);
                }
            }
            else{
                this.setMotorForce(-0.28);
            }
 
            if (!this.motorActive || this.isMoving) {
                clearInterval(intervalId);
            }
        }, 10); 
    }
}