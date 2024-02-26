
let char;
function setup() {
  createCanvas(400, 400);
  char = new Character({ x: 150, y: 150 });
  char.addBody({
    numberOfSides: 4,
    sideLength: 100,
    horizontalStretch: 1,
    verticalStretch: 1.5,
  });
  char.addHead({
    numberOfSides: 5,
    sideLength: 50,
  });

  // char.headProps.tiltAngle = 45;
}

function draw() {
  background(220);
  
  // let angle = (atan2(mouseY - char.body.top.y, mouseX - char.body.top.x) * 180) / PI;
  // char.headProps.tiltAngle = angle;

  // char.headProps.tiltAngle = 0;

  // char.body.rotation = angle * PI / 180;

  char.render();

}



