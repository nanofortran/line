let line, color;

function setup() {
  createCanvas(500, 500);
  line = new Line();
  color = new Line();
  colorMode(HSB);

  line.setLines(0, 1000, 1, 1000, .5, 1200, .75, 2000, 0, 2000);
  color.setLines(0, 1000, 1, 1000, .5, 1200, .75, 2000, 0, 2000);

  line.setStartValue(8);
  color.setStartValue(1);

  smooth();

}

function draw() {
  background(0);
  fill(255 * color.update(), 255, 255);
  ellipse(width / 2, height / 2, 300 * line.update());
}

function mouseClicked() {
  line.trigger();
  color.trigger();
}
