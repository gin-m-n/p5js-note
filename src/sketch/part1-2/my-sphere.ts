import p5 from 'p5'

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 0;

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, "webgl");
      p.smooth();
      p.background(BG_COLOR);
      p.stroke(255);
      p.frameRate(255)

    }

    let s = 0
    let t = 0
    const radius = 300
    let lastX = -1
    let lastY = -1
    let lastZ = -1
    p.draw = () => {
      if (t > 180) return
      s += 18 / 3;
      t += 1 / 3

      p.rotateX(p.radians(45))
      p.rotateY(p.radians(45))

      const radS = p.radians(s)
      const radT = p.radians(t)
      const x = radius * p.cos(radS) * p.sin(radT)
      const y = radius * p.sin(radS) * p.sin(radT)
      const z = radius * p.cos(radT)
      if (lastX !== -1) {
        p.line(x, y, z, lastX, lastY, lastZ)
      }
      lastX = x
      lastY = y
      lastZ = z
    }

  }
  new p5(sketch, node)
}
