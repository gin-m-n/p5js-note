import p5 from 'p5'

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 0;
    const sideLength = 100
    const step = 5

    const drawPoint = (x: number, y: number, z: number, noise: number) => {
      p.push()
      p.translate(x - sideLength / 2, y - sideLength / 2, z - sideLength / 2)
      const g = 255 * noise
      p.fill(g, 10)
      p.box(step, step, step)
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
    let zstart = p.random(10)

    p.draw = () => {
      const t = performance.now() / 1000
      p.background(BG_COLOR);
      const startNoiseStep = 0.05
      xstart += startNoiseStep
      ystart += startNoiseStep
      zstart += startNoiseStep

      p.translate(0, 0, 600)
      p.rotateX(t / 3)
      p.rotateY(t / 3)

      const noiseStep = 0.1
      let znoise = zstart;
      for (let z = 0; z < sideLength; z += step) {
        znoise += noiseStep
        let ynoise = ystart;
        for (let y = 0; y <= sideLength; y += step) {
          ynoise += noiseStep
          let xnoise = xstart;
          for (let x = 0; x <= sideLength; x += step) {
            xnoise += noiseStep
            drawPoint(x, y, z, p.noise(xnoise, ynoise, znoise))
          }
        }
      }
    }
  }

  new p5(sketch, node)
}



