import p5 from 'p5'

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 0;

    const drawPoint = (x: number, y: number, noise: number) => {
      p.push()
      const radius = 35 * noise
      p.translate(x - p.width / 2 + radius, y - p.height / 2 + radius - 100, y - 1000)
      const g = 150 + noise * 100
      const a = 150 + noise * 100
      p.fill(g, a)
      p.sphere(radius, 8, 8)
      p.pop()
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, "webgl");
      p.smooth();
      p.background(BG_COLOR);
      p.noStroke();
      p.frameRate(20)
    }

    let xstart = p.random(10)
    let ystart = p.random(10)
    const step = 15

    p.draw = () => {
      p.background(BG_COLOR);
      xstart += 0.01
      ystart += 0.01
      let xnoise = xstart;
      let ynoise = ystart;
      for (let y = 0; y <= p.height; y += step) {
        ynoise += 0.1
        xnoise = xstart;
        for (let x = 0; x <= p.width; x += step) {
          xnoise += 0.1
          drawPoint(x, y, p.noise(xnoise, ynoise))
        }
      }
    }

    p.mouseMoved = () => {
      console.log(p.mouseX, p.mouseY);
    }

  }

  new p5(sketch, node)
}



