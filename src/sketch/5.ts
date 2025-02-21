import p5 from 'p5'

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 255;
    p.setup = () => {
      p.createCanvas(300, 300);
      p.smooth();
      p.background(BG_COLOR);
      const xstart = p.random(10);
      let xnoise = xstart;
      let ynoise = p.random(10);
      for (let y = 0; y <= p.height; y += 1) {
        ynoise += 0.01;
        xnoise = xstart;
        for (let x = 0; x <= p.width; x += 1) {
          xnoise += 0.01;
          const alpha = p.noise(xnoise, ynoise) * 255;
          p.stroke(0, alpha)
          p.line(x, y, x + 1, y + 1)
        }
      }
    }

    p.draw = () => {
    }

  }
  new p5(sketch, node)
}



