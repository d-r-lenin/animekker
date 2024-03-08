class Timeline {
  constructor() {
    this.stateOptions = {
      STOPPED: 0,
      PLAYING: 1,
      PAUSED: 2,
    };
    this.start = 0;
    this.end = 0;
    this.duration = 0;
    this.current = 0;
    this.attributes = {
      milliseconds: 0,
    };
    this.state = this.stateOptions.STOPPED;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  play() {
    this.end = this.duration;
    this.state = this.stateOptions.PLAYING;
  }

  update(milliseconds) {
    if (this.state === this.stateOptions.PLAYING) {
      this.current += milliseconds;
      this.attributes.milliseconds = this.current;
      if (this.current >= this.end) {
        this.current = 0;
      }
    }
  }

  pause() {
    this.state = this.stateOptions.PAUSED;
  }

  stop() {
    this.state = this.stateOptions.STOPPED;
  }

  setAttribute(attribute, startValue, endValue, startFrom = 0, endAt = 0) {
    this.attributes[attribute] = {
      startValue,
      endValue,
      startFrom,
      endAt,
      value: startValue,
    };
  }

  updateAttribute(attribute) {
    const { startValue, endValue, startFrom, endAt } =
      this.attributes[attribute];
    const value = mapRange(
      this.attributes.milliseconds,
      startFrom,
      endAt,
      startValue,
      endValue
    );
    // console.log(value);
    this.attributes[attribute].value = value;
  }
}

function mapRange(value, fromMin, fromMax, toMin, toMax) {
  // Check if the value is outside the source range
  if (value < fromMin) {
    value = fromMin;
  } else if (value > fromMax) {
    value = fromMax;
  }

  // Calculate the percentage of the value within the source range
  const percentage = (value - fromMin) / (fromMax - fromMin);

  // Map the percentage to the target range
  const mappedValue = toMin + percentage * (toMax - toMin);

  return mappedValue;
}
