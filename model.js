class Model{
    constructor(elevator, stages){
        this.elevator=elevator;
        this.stages=stages;
    }
}

let model;

function initializeModel(elevator, stages){
    model=new Model(elevator, stages);
}

export{
    model,
    initializeModel
}