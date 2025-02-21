import p5 from 'p5'


const LINE_LENGTH = 15

const drawLine = (p: p5, x: number, y: number, noise: number) => {
  p.push()
  p.translate(x, y)
  p.rotate(noise * 2 * p.PI)
  p.stroke(0, 100)
  p.strokeWeight(2)
  p.line(0, 0, LINE_LENGTH, 0)
  p.pop()
}


export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 255;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.smooth();
      p.background(BG_COLOR);
    }

    p.draw = () => {
      const t = performance.now() / 1000 + 100
      p.background(BG_COLOR);

      for (let y = 0; y <= p.height; y += LINE_LENGTH - 5) {
        const ynoise = y / 100;
        for (let x = 0; x <= p.width; x += LINE_LENGTH - 5) {
          const xnoise = x / 100 + t / 5;
          drawLine(p, x, y, p.noise(xnoise, ynoise))
        }
      }
    }

  }

  new p5(sketch, node)
}



