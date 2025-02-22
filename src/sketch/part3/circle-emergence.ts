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
        this.x = p.random(p.width)
        this.y = p.random(p.height)
        this.radius = p.random(120) + 10
        this.linecol = p.color(p.random(255), p.random(255), p.random(255), 150)
        this.alpha = p.random(255)
        this.fillColor = p.color(p.random(255), p.random(255), p.random(255), this.alpha)
        const speed = 5
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

        // 画面上から完全に消えたら... という条件
        // 中心座標 > 端+半径 ⇔ 完全に画面から消えた
        if (this.x > p.width + this.radius) this.x = 0 - this.radius
        if (this.x < 0 - this.radius) this.x = p.width + this.radius
        if (this.y > p.height + this.radius) this.y = 0 - this.radius
        if (this.y < 0 - this.radius) this.y = p.height + this.radius

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

