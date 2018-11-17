$(() => {

  const canvas = $('canvas')[0];

  const c = canvas.getContext('2d');
  const mouse = {};
  const size = 40;
  let x = 0;
  let y = 0;
  let isUp = true;
  const lines = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Line {
    constructor(startPoint, isUp) {
      this.startPoint = startPoint;
      this.opacity = 0;
      this.isUp = isUp;
    }
    draw() {
      const start = {
        x: this.startPoint.x,
        y: this.isUp ? this.startPoint.y + size : this.startPoint.y
      };
      const end = {
        x: this.startPoint.x + size,
        y: this.isUp ? this.startPoint.y - size : this.startPoint.y + size
      };
      c.beginPath();
      c.moveTo(start.x, start.y);
      c.lineTo(end.x, end.y);
      c.strokeStyle = `rgba( 255, 255, 255, ${this.opacity})`;
      c.lineWidth = size / 10;
      c.stroke();
    }
    update() {
      if(mouse.x - this.startPoint.x < 40 && mouse.x - this.startPoint.x > - 40 &&
        mouse.y - this.startPoint.y < 40 && mouse.y - this.startPoint.y > - 40
      ) {
        this.opacity = 0.5;
      } else {
        this.opacity > 0 ? this.opacity -= 0.01 : this.opacity = 0;
      }
      this.draw();
    }
  }

  function init() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    while(y < innerHeight ) {
      isUp = Math.random() > 0.5;
      const line = new Line({ x: x, y: y }, isUp);
      line.draw();
      lines.push(line);
      x += (size * 3);
      console.log(x);
      if(x >= innerWidth) {
        x = 0;
        y += (size * 3);
      }
    }
  }

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    lines.forEach(line => {
      line.update();
    });
  }

  init();
  animate();
});
