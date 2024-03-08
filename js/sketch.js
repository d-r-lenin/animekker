
let char;
let timeline;
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

  timeline = new Timeline();
  timeline.setDuration(10000);
  timeline.play();
  timeline.setAttribute('tiltAngle', 0, 360, 0, 10000);
}


let lastMill = new Date().getTime();
function draw() {
  background(220);
  const currentMill = new Date().getTime();

  timeline.update(currentMill - lastMill);
  timeline.updateAttribute('tiltAngle');

  char.headProps.tiltAngle = timeline.attributes.tiltAngle.value;

  
  char.render();
  
  fps = frameRate();
  fill(0);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
  
  lastMill = currentMill;
}

