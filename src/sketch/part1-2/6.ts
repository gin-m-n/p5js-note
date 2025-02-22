import p5 from 'p5'


const BOX_SIZE = 25

const drawPoint = (p: p5, x: number, y: number, noise: number) => {
  const len = BOX_SIZE * noise;
  p.rect(x, y, len, len)
}


export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 130;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.smooth();
      p.background(BG_COLOR);
      p.stroke(122)
    }

    p.draw = () => {
      const t = performance.now() / 1000 + 100
      p.background(BG_COLOR);

      for (let y = 0; y <= p.height; y += BOX_SIZE / 2) {
        const ynoise = y / 100;
        for (let x = 0; x <= p.width; x += BOX_SIZE / 2) {
          const xnoise = x / 100 + t / 5;
          drawPoint(p, x, y, p.noise(xnoise, ynoise))
        }
      }
    }

  }

  new p5(sketch, node)
}



