class Character {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.headProps = {
      tiltAngle: 0,
      xOff: 0, // from the top of the body
      yOff: 0, // from the top of the body
    };
  }

  addBody({
    numberOfSides,
    type = "polygon",
    sideLength,
    horizontalStretch,
    verticalStretch,
    rotation = 0,
  }) {
    this.body = new Body(
      numberOfSides,
      type,
      this.x,
      this.y,
      sideLength,
      horizontalStretch,
      verticalStretch,
      rotation
    );
  }

  addHead({
    numberOfSides,
    type = "polygon",
    sideLength,
    horizontalStretch,
    verticalStretch,
    rotation = 0,
  }) {
    this.head = new Body(
      numberOfSides,
      type,
      this.body.top.x,
      this.body.top.y,
      sideLength,
      horizontalStretch,
      verticalStretch,
      rotation
    );

    this.setHeadPosition(0, 0, true);
    this.head.rotateFromStart = true;
  }

  render() {
    this.body.createObject();
    this.body.renderObject();

    this.applyHeadProps();

    this.head.renderObject();

    // add line from the top of the body to the head
    line(this.body.top.x, this.body.top.y, this.head.top.x, this.head.top.y);
  }

  setHeadPosition(xOff, yOff, center = false) {
    if (center) {
      this.headProps.xOff = xOff - this.head.sideLength / 2;
      this.headProps.yOff = yOff - this.head.sideLength * 2;
      return;
    }
    this.headProps.xOff = xOff;
    this.headProps.yOff = yOff;
  }

  applyHeadProps() {
    this.head.x = this.headProps.xOff + this.body.top.x;
    this.head.y = this.headProps.yOff + this.body.top.y;
    this.applyTiltAngle();
    this.head.createObject();
  }

  applyTiltAngle() {
    // add rotation and tilt head from the top of the body. tilt angle is in degrees
    const centerOfRotation = { x: this.body.top.x, y: this.body.top.y };
    const x = this.head.x - centerOfRotation.x;
    const y = this.head.y - centerOfRotation.y;
    // convert angle to radians
    let angle = (this.headProps.tiltAngle * PI) / 180;
    // add rotation of the body
    angle = angle + this.body.rotation;
    const xnew = x * cos(angle) - y * sin(angle);
    const ynew = x * sin(angle) + y * cos(angle);
    this.head.x = xnew + centerOfRotation.x;
    this.head.y = ynew + centerOfRotation.y;

    //  add rotation
    this.head.rotation = angle;
  }
}
