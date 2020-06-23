//Interval provides enveloping functions to time-based events. A construction of
//destination, time duples
//fade1.setFades(0, 500, 1, 100, 0, 3000)
class Line {
  constructor() {
    this.running = false;
    this.runTime = 0;
    this.endTime = 4000;
    this.startTime = 0;

    this.startValue = 0;
    this.setStartVal = 0;
    this.endValue = 0;
    this.rollOver = 0;

    this.lineArray = [];
    this.lineSegment; //

    this.value = 0;

  }


  setLines() {
    for (let i = 0; i < arguments.length; i++) {
      this.lineArray.push(arguments[i]);
      // console.log(arguments[i])
    }
  }

  setStartValue(v) {
    this.setStartVal = v;
    // console.log(this.setStartValue);
  }




  update() {
    if (this.running) {
      this.run();
      // console.log('running');
    } else {
      this.startTime = millis(); //continuously update startTime to NOW (millis()) while !this.running
    }
    return this.value; //update returns the value of the line
  }

  trigger() {
    this.startTime = millis(); //start at this moment in time (millis())
    this.lineSegment = 0; //begin at the first line segment
    this.setSegment(this.lineSegment); //retrieve and set the segments (destination and time to destination)
    this.startValue = this.setStartVal; //start value is 0 unless overwritten by setStartValue()
    this.running = true; //turn on running . . .
    // console.log(this.startValue);
  }

  //retrieves values from your array of segments (destination:timeToDestination pairs)
  setSegment(s) { //receives the index of the pair to be retrieved
    this.endValue = this.lineArray[s]; //set endValue -- destination
    this.endTime = this.lineArray[s + 1]; //set endTime -- timeToDestination
    this.startValue = this.value; //begin next segment at last .value attained/met
    // console.log('new value  ' + this.value);
  }

  run() {
    this.runTime = millis() - this.startTime; //compute millis() elapsed since startTime
    // console.log(this.value);

    //check to make sure start values are within bounds (0-1), if not set to upper/lower limits
    if (this.startValue > 1) {
      this.startValue = 1;
    }
    if (this.startValue < 0) {
      this.startValue = 0;
    }

    //map runTime to the new timeToDestinatin
    this.value = map(this.runTime, 0, this.endTime, this.startValue, this.endValue);

    //check to insure the values reported are within bounds (0-1), if not set to upper/lower limits
    if (this.value > 1) {
      this.value = 1;
    }
    if (this.value < 0) {
      this.value = 0;
    }

    if (this.runTime >= this.endTime) { //if we have surpassed the end of the segment's endTime (segemnt is done)
      if (this.lineSegment >= this.lineArray.length / 2 - 1) { //if we are out of segments, then stop running
        // console.log('done at line segment # ' + this.lineSegment);
        this.running = false;
      }
      this.lineSegment++; //if we have segments to go, incement to the next one
      this.startTime = millis(); //startTime reset to NOW, about to begin next segment
      this.setSegment(this.lineSegment * 2); //setSegment to next pair
      // console.log(">>>" + this.endValue, this.endTime, this.startValue)
      // console.log(this.lineSegment);
    }
  }
} ///////////////////////END LINE CLASS
