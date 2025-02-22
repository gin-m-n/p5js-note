import p5, { Color } from 'p5'
import GUI from 'lil-gui';


export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    class Circle {
      x: number
      xStep: number
      y: number
      yStep: number
      radius: number
      alpha: number
      linecol: Color
      fillColor: Color

      constructor() {
        this.x = 300 + p.random(p.width - 600)
        this.y = 300 + p.random(p.height - 600)
        this.radius = p.random(120) + 10
        this.linecol = p.color(p.random(255), p.random(255), p.random(255), 150)
        this.alpha = p.random(255)
        this.fillColor = p.color(p.random(255), p.random(255), p.random(255), this.alpha)
        const speed = 10
        this.xStep = (-0.5 + p.random(1)) * speed
        this.yStep = (-0.5 + p.random(1)) * speed
      }

      drawMe() {
        p.noStroke();
        p.fill(this.fillColor)
        p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)

        p.stroke(this.linecol);
        p.noFill()
        p.ellipse(this.x, this.y, 10, 10)
      }

      updateMe() {
        this.x += this.xStep
        this.y += this.yStep


        if (this.x + this.radius >= p.width) this.xStep = -this.xStep
        if (this.x - this.radius <= 0) this.xStep = -this.xStep
        if (this.y + this.radius >= p.height) this.yStep = -this.yStep
        if (this.y - this.radius <= 0) this.yStep = -this.yStep

      }

      overlap(other: Circle) {
        const d = p.dist(this.x, this.y, other.x, other.y)
        return d - this.radius - other.radius

      }

      isTouchingOther(other: Circle) {
        return this.overlap(other) < 0
      }

      changeColor() {
        this.fillColor = p.color(255, 0, 0)
      }
    }

    function addCircle(circle: Circle) {
      circleArr.push(circle)
      param.numberOfOriginCircle = circleArr.length
    }

    function drawChildCircles() {
      circleArr.forEach((c) => {
        circleArr
          .filter((other) => c !== other)
          .filter(other => c.isTouchingOther(other))
          .forEach((other) => {
            const midx = (c.x + other.x) / 2
            const midy = (c.y + other.y) / 2
            const overlap = -c.overlap(other)
            p.stroke(0, 100)
            p.noFill()
            p.ellipse(midx, midy, overlap, overlap)
          })
      })
    }



    const circleArr: Circle[] = []
    const param = {
      isOriginCircleDrawn: true,
      isChildCircleDrawn: false,
      numberOfOriginCircle: 0
    }
    const BG_COLOR = 255;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.frameRate(60)
      p.smooth();
      p.background(BG_COLOR);
      p.strokeWeight(1);

      Array(10).fill(0).forEach(() => {
        addCircle(new Circle())
      })
    }

    p.draw = () => {
      p.background(BG_COLOR);

      circleArr.forEach((c) => {
        c.updateMe()
        if (param.isOriginCircleDrawn) c.drawMe()
      })

      if (param.isChildCircleDrawn) drawChildCircles()
    }

    p.mouseReleased = (e) => {
      // @ts-ignore
      if (e.target.tagName !== "CANVAS") return

      Array(10).fill(0).forEach(() => {
        addCircle(new Circle())
      })
    }

    const gui = new GUI();
    gui.add(param, 'isOriginCircleDrawn');
    gui.add(param, "isChildCircleDrawn")
    gui.add(param, "numberOfOriginCircle").listen().disable()
  }

  new p5(sketch, node)
}

