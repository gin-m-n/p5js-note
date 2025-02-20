import p5 from 'p5'

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(120)
      p.frameRate(30)
    }

    p.draw = () => {
    }

    p.mouseMoved = () => {
      p.ellipse(p.mouseX, p.mouseY, 100, 100)
    }
  }
  new p5(sketch, node)
}

