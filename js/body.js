class Body {
  constructor(
    numberOfSides,
    type = "polygon",
    x,
    y,
    sideLength,
    horizontalStretch,
    verticalStretch,
    rotation = 0
  ) {
    this.x = x;
    this.y = y;
    this.numberOfSides = numberOfSides;
    this.type = type;
    this.sideLength = sideLength;
    this.horizontalStretch = horizontalStretch || 1;
    this.verticalStretch = verticalStretch || 1;
    this.rotation = rotation || 0;
    this.rotateFromTop = false;
    this.rotateFromStart = false;
    this.createObject();
  }

  createObject() {
    switch (this.type) {
      case "polygon":
        this.createPolygon();
        break;
      default:
        throw new Error("Invalid type");
    }
  }

  renderObject() {
    switch (this.type) {
      case "polygon":
        this.drawPolygon();
        break;
      default:
        throw new Error("Invalid type");
    }
  }

  createPolygon() {
    this.points = [];

    let x = this.x;
    let y = this.y;
    for (var i = 0; i < this.numberOfSides; i++) {
      var angle = (TWO_PI / this.numberOfSides) * i;
      x = x + cos(angle) * this.sideLength * this.horizontalStretch;
      y = y + sin(angle) * this.sideLength * this.verticalStretch;
      this.points.push({ x, y });
    }

    this.calculatePolygonCenter();
    this.calculateTop();
    this.rotatePolygon();
  }

  rotatePolygon() {
    // add rotation
    if (this.rotation === 0) {
      return;
    }

    if (this.rotateFromTop) {
      this.rotateFromTopOfPolygon();
      return;
    }

    if (this.rotateFromStart) {
      this.rotateFromStartOfPolygon();
      return;
    }

    for (var i = 0; i < this.numberOfSides; i++) {
      var x = this.points[i].x - this.center.x;
      var y = this.points[i].y - this.center.y;
      var xnew = x * cos(this.rotation) - y * sin(this.rotation);
      var ynew = x * sin(this.rotation) + y * cos(this.rotation);
      this.points[i].x = xnew + this.center.x;
      this.points[i].y = ynew + this.center.y;
    }
  }

  rotateFromTopOfPolygon() {
    for (var i = 0; i < this.numberOfSides; i++) {
      var x = this.points[i].x - this.top.x;
      var y = this.points[i].y - this.top.y;
      var xnew = x * cos(this.rotation) - y * sin(this.rotation);
      var ynew = x * sin(this.rotation) + y * cos(this.rotation);
      this.points[i].x = xnew + this.top.x;
      this.points[i].y = ynew + this.top.y;
    }
  }

  rotateFromStartOfPolygon() {
    for (var i = 0; i < this.numberOfSides; i++) {
      var x = this.points[i].x - this.x;
      var y = this.points[i].y - this.y;
      var xnew = x * cos(this.rotation) - y * sin(this.rotation);
      var ynew = x * sin(this.rotation) + y * cos(this.rotation);
      this.points[i].x = xnew + this.x;
      this.points[i].y = ynew + this.y;
    }
  }

  drawPolygon() {
    beginShape();

    for (var i = 0; i < this.numberOfSides; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }

    this.calculatePolygonCenter();
    this.calculateTop();

    // default fill
    fill(255, 255, 255);
    endShape(CLOSE);
    // starting point
    fill(255, 0, 0);
    ellipse(this.x, this.y, 5, 5);

    // calculate the center of the polygon
    fill(0, 0, 255);
    ellipse(this.center.x, this.center.y, 5, 5);

    // calculate the top of the polygon
    fill(0, 255, 0);
    ellipse(this.top.x, this.top.y, 5, 5);
  }

  calculatePolygonCenter() {
    const numPoints = this.points.length;

    // Ensure the polygon has at least three points
    if (numPoints < 3) {
      throw new Error("A polygon must have at least three points");
    }

    // Initialize variables for the sums
    let sumX = 0;
    let sumY = 0;

    // Calculate the sum of x and y coordinates
    for (const point of this.points) {
      sumX += point.x;
      sumY += point.y;
    }

    // Calculate the center point coordinates
    const centerX = sumX / numPoints;
    const centerY = sumY / numPoints;

    this.center = { x: centerX, y: centerY };
  }

  calculateTop() {
    // center of last and first point
    const x = (this.points[0].x + this.points[this.numberOfSides - 1].x) / 2;
    const y = (this.points[0].y + this.points[this.numberOfSides - 1].y) / 2;

    this.top = { x, y };
  }
}
