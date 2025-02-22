import p5 from 'p5'

type V2 = {
  x: number
  y: number
}

type Triangle = {
  a: V2,
  b: V2,
  c: V2,
  color: {
    r: number
    g: number
    b: number
  }
}

export const start = (node: HTMLElement) => {
  let basePosition: Pick<Triangle, "a" | "b" | "c">
  let t: Triangle
  let t2: Triangle
  let t2Center: V2
  const r = 300

  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(150)
      p.frameRate(30)

      const x = p.width / 4 * 3
      const x2 = p.width / 4 * 1
      const y = p.height / 2

      const vectors: V2[] = [0, 2, 4].map((n) => {
        return { x: x + p.cos(p.PI / 3 * n) * r, y: y + p.sin(p.PI / 3 * n) * r }
      })

      const vectors2: V2[] = [0, 2, 4].map((n) => {
        return { x: x2 + p.cos(p.PI / 3 * n) * r, y: y + p.sin(p.PI / 3 * n) * r }
      })

      t = {
        a: vectors[0],
        b: vectors[1],
        c: vectors[2],
        color: {
          r: 100,
          g: 10,
          b: 100,
        }
      }

      t2Center = {
        x: x2, y: y
      }

      t2 = {
        a: vectors2[0],
        b: vectors2[1],
        c: vectors2[2],
        color: {
          r: 10,
          g: 100,
          b: 100,
        }
      }

      basePosition = {
        a: structuredClone(vectors[0]),
        b: structuredClone(vectors[1]),
        c: structuredClone(vectors[2]),
      }
      p.strokeWeight(10)
    }

    function drawT(t: Triangle) {
      p.fill(t.color.r, t.color.g, t.color.b)
      p.triangle(
        t.a.x, t.a.y,
        t.b.x, t.b.y,
        t.c.x, t.c.y,
      )
    }

    let seeds = new Array(3).fill(0).map(() => p.random(10))
    function updateT() {
      const noise = seeds.map(s => p.noise(s)).map(n => (-0.5 + n) * 800)
      t.a.x = basePosition.a.x + noise[0]
      t.a.y = basePosition.a.y + noise[0]
      t.b.x = basePosition.b.x + noise[1]
      t.b.y = basePosition.b.y + noise[1]
      t.c.x = basePosition.c.x + noise[2]
      t.c.y = basePosition.c.y + noise[2]
      t.color.r = p.noise(seeds[0]) * 250
      seeds = seeds.map(s => s += 0.01)
    }

    let seeds2 = new Array(3).fill(0).map(() => p.random(10))
    function updateT2() {
      const noise = seeds2.map(s => p.noise(s)).map(n => (-0.5 + n) * 800)
      let theta = Math.PI / 3 * 0
      t2.a.x = (r + noise[0]) * p.cos(theta) + t2Center.x
      t2.a.y = (r + noise[0]) * p.sin(theta) + t2Center.y
      theta = Math.PI / 3 * 2
      t2.b.x = (r + noise[1]) * p.cos(theta) + t2Center.x
      t2.b.y = (r + noise[1]) * p.sin(theta) + t2Center.y
      theta = Math.PI / 3 * 4
      t2.c.x = (r + noise[2]) * p.cos(theta) + t2Center.x
      t2.c.y = (r + noise[2]) * p.sin(theta) + t2Center.y

      t2.color.b = p.noise(seeds2[0]) * 255
      seeds2 = seeds2.map(s => s += 0.01)
    }

    p.draw = () => {
      p.background(150)
      updateT()
      updateT2()
      drawT(t)
      drawT(t2)
    }
    p.mouseMoved = () => {
    }
  }
  new p5(sketch, node)
}

