import p5 from 'p5'

type Triangle = {
  a: {
    x: number, y: number
  },
  b: {
    x: number, y: number
  },
  c: {
    x: number, y: number
  },
  color: {
    r: number, g: number, b: number, a: number
  }
}

export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    let triangles: Triangle[] = []

    function drawT(t: Triangle) {
      p.noStroke()
      const { r, g, b, a } = t.color
      p.fill(r, g, b, a)

      p.triangle(
        t.a.x, t.a.y,
        t.b.x, t.b.y,
        t.c.x, t.c.y
      )
    }

    function elapseT(t: Triangle) {
      const M = 10
      t.a.x += p.noise(t.a.x) * 2 * M - M
      t.a.y += p.noise(t.a.y) * 2 * M - M
      t.b.x += p.noise(t.b.x) * 2 * M - M
      t.b.y += p.noise(t.b.y) * 2 * M - M
      t.c.x += p.noise(t.c.x) * 2 * M - M
      t.c.y += p.noise(t.c.y) * 2 * M - M

      t.color.a -= 5
    }

    let noiseSeed1 = p.random(10)
    let noiseSeed2 = p.random(10)
    let noiseSeed3 = p.random(10)
    function addT(x: number, y: number) {
      noiseSeed1 += 0.5
      noiseSeed2 += 0.5
      noiseSeed3 += 0.5
      const noise1 = p.noise(noiseSeed1)
      const noise2 = p.noise(noiseSeed2)
      const noise3 = p.noise(noiseSeed3)
      const noiseCoefficient = 3

      const r = 40 + (-10 + noise1 * 20)
      const theta1 = 0 + noise1 * noiseCoefficient
      const theta2 = 2 * p.PI / 3 + noise2 * noiseCoefficient
      const theta3 = 2 * (2 * p.PI / 3) + noise3 * noiseCoefficient

      const R = 50 + noise1 * 100
      const G = 80 + noise2 * 130
      const B = 80 + noise3 * 175
      const t: Triangle = {
        a: { x: x + Math.cos(theta1) * r, y: y + Math.sin(theta1) * r },
        b: { x: x + Math.cos(theta2) * r, y: y + Math.sin(theta2) * r },
        c: { x: x + Math.cos(theta3) * r, y: y + Math.sin(theta3) * r },
        color: {
          r: R, g: G, b: B, a: 255
        }
      }
      triangles.push(t)
    }

    function deleteInvisibleT() {
      triangles = triangles.filter(t => t.color.a > 0)
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.frameRate(30)
    }


    const len = 3
    let t = Array(len).fill(0).map((_, i) => p.windowWidth / len * i)
    p.draw = () => {
      p.background(20)

      for (let i = 0; i < t.length; i++) {
        const theta = p.radians(t[i])
        const param = 200
        const noise = -param + p.noise(t[i]) * 2 * param
        const px = t[i] % p.width + noise
        const py = (p.height / 2 + p.sin(theta) * 300) + noise
        addT(px, py)
        t[i] += p.noise(t[i]) * 8
      }
      triangles.forEach(t => {
        elapseT(t)
        drawT(t)
      })

      deleteInvisibleT()

    }

    let mouseDrawSleep = true
    p.mouseMoved = () => {
      if (mouseDrawSleep) {
        addT(p.mouseX, p.mouseY)
        mouseDrawSleep = false
        setTimeout(() => {
          mouseDrawSleep = true
        }, 50)
      }
    }
  }
  new p5(sketch, node)
}

