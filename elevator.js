import { cam } from "./camera.js";
import { gravity, height } from "./parameters.js";
import { Body } from "./physics.js";

export class Elevator{
    constructor(object, minSpeed, maxSpeed){
        this.object=object;
        this.motorActive=false;
        this.motorForce=0;
        this.currentMotorForce=0;
        this.currentStage=0;
        this.maxSpeed=maxSpeed;
        this.minSpeed=minSpeed;
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
            direction=0.8;
        }
    
        const intervalId = setInterval(() => {
            delta = Math.abs(stagePos - cam.getElevatorPos());
            
            if (delta<=20) {
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

                let force=this.maxSpeed-185/delta;     //1.5+delta/185;

                if(force<this.minSpeed){
                    force=this.minSpeed;
                }

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
        const step=0.02;

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
                    this.setMotorForce(-0.55*gravity);
                }
                else{
                    this.setMotorForce(0.05*gravity);
                }
            }
            else{
                this.setMotorForce(-0.28*gravity);
            }
 
            if (!this.motorActive || this.isMoving) {
                clearInterval(intervalId);
            }
        }, 10); 
    }
}