import p5 from 'p5'


const SIZE = 130

const drawEllipse = (p: p5, x: number, y: number, noise: number) => {
  p.push()
  p.noStroke()
  p.translate(x, y)
  p.rotate(noise * p.PI)
  const g = 150 + noise * 120
  const a = 150 + noise * 120
  p.fill(g, a)
  const edgeSize = SIZE * noise
  p.ellipse(0, 0, edgeSize, edgeSize / 2)
  p.pop()
}


export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 0;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.smooth();
      p.background(BG_COLOR);
    }

    let startyNoise = p.random(20)
    let startxNoise = p.random(20)
    let starty = p.random(10)
    let startx = p.random(10)

    p.draw = () => {
      p.background(BG_COLOR);
      startxNoise += 0.01
      startyNoise += 0.01

      // HACK: ノイズがなびく方向をランダムに変える用にしている
      starty += p.noise(startyNoise) * 0.2 - 0.1
      startx += p.noise(startxNoise) * 0.2 - 0.1

      let ynoise = starty;
      for (let y = 0; y <= p.height; y += 10) {
        ynoise += 0.1;
        let xnoise = startx;
        for (let x = 0; x <= p.width; x += 10) {
          xnoise += 0.1
          drawEllipse(p, x, y, p.noise(xnoise, ynoise))
        }
      }
    }

  }

  new p5(sketch, node)
}



