const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World=Matter.World,
    Body=Matter.Body;

const engine = Engine.create();
engine.gravity.y=1;

export{
    Engine,
    engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Body
}