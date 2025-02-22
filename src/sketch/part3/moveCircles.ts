import p5, { Color } from 'p5'


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
        this.radius = p.random(90) + 10
        this.linecol = p.color(p.random(255), p.random(255), p.random(255), 150)
        this.alpha = p.random(255)
        this.fillColor = p.color(p.random(255), p.random(255), p.random(255), this.alpha)
        this.xStep = (-0.5 + p.random(1)) * 5
        this.yStep = (-0.5 + p.random(1)) * 5
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

        const isTouching = circleArr
          .filter((other) => this !== other)
          .some((other) => this.isTouchingOther(other))

        if (isTouching) {
          this.alpha--
        } else {
          this.alpha += 2
        }
        this.fillColor.setAlpha(this.alpha)
      }

      isTouchingOther(other: Circle) {
        const d = p.dist(this.x, this.y, other.x, other.y)
        const isTouching = d - this.radius - other.radius < 0
        return isTouching
      }

      changeColor() {
        this.fillColor = p.color(255, 0, 0)
      }
    }
    const circleArr: Circle[] = []
    const BG_COLOR = 255;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.frameRate(30)
      p.smooth();
      p.background(BG_COLOR);
      p.strokeWeight(1);

      Array(10).fill(0).forEach(() => {
        circleArr.push(new Circle())
      })
    }

    p.draw = () => {
      p.background(BG_COLOR);

      circleArr.forEach((c) => {
        c.updateMe()
        c.drawMe()
      })
    }

    p.mouseReleased = () => {
      Array(10).fill(0).forEach(() => {
        circleArr.push(new Circle())
      })
    }
  }

  new p5(sketch, node)
}

