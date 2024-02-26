function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  drawPoligon(5, 100, 100, 100,1,1,0);

}




function drawPoligon(numberOfSides, x, y, radius, horizontalStretch, verticalStretch, rotation=0){
  beginShape();

  const points = [];
  startx = x;
  starty = y;

  horizontalStretch = horizontalStretch || 1;
  verticalStretch = verticalStretch || 1;
  for (var i = 0; i < numberOfSides; i++) {
    var angle = TWO_PI / numberOfSides * i;
     x = x + cos(angle) * radius * horizontalStretch;
     y = y + sin(angle) * radius * verticalStretch;
    points.push({ x, y });
  }
  
  const center = calculatePolygonCenter(points);

  // add rotation
  for (var i = 0; i < numberOfSides; i++) {
    var x = points[i].x - center.x;
    var y = points[i].y - center.y;
    var xnew = x * cos(rotation) - y * sin(rotation);
    var ynew = x * sin(rotation) + y * cos(rotation);
    points[i].x = xnew + center.x;
    points[i].y = ynew + center.y;
  }

  // draw the polygon
  for (var i = 0; i < numberOfSides; i++) {
    vertex(points[i].x, points[i].y);
  }

  // default fill
  fill(255, 255, 255);
  endShape(CLOSE);

  // starting point
  fill(255, 0, 0);
  ellipse(startx, starty, 5, 5);

  // calculate the center of the polygon
  fill(0, 0, 255);
  ellipse(center.x, center.y, 5, 5);
}


function calculatePolygonCenter(points) {
  const numPoints = points.length;

  // Ensure the polygon has at least three points
  if (numPoints < 3) {
    throw new Error("A polygon must have at least three points");
  }

  // Initialize variables for the sums
  let sumX = 0;
  let sumY = 0;

  // Calculate the sum of x and y coordinates
  for (const point of points) {
    sumX += point.x;
    sumY += point.y;
  }

  // Calculate the center point coordinates
  const centerX = sumX / numPoints;
  const centerY = sumY / numPoints;

  return { x: centerX, y: centerY };
}
