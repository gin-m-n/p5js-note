import GUI from "lil-gui"
import p5 from "p5"

const BG_COLOR = 0
const duration = 120
const size = 70
const gap = 10
const moveAmount = size + gap
const apearPoint = gap / 2 + size / 2
const tileAmount = 10
const squareList: Square[] = []

const calcMaxRowSize = (length: number) => {
  return Math.floor(length / (size + gap))
}

const genSquareRow = (n: number, startX: number, startY: number, createdAt: number) => {
  return new Array(n).fill(0).map((_, i) => {
    const x = startX + i * gap + i * size
    return new Square(x, startY, size, createdAt)
  })
}

const calcIndexOnGraphic = (x: number, y: number) => {
  let ix = -1
  const left = gap / 2
  for (let i = 1; i <= tileAmount; i += 1) {
    if (x < left + i * (size + gap)) {
      ix = i - 1
      break
    }
  }
  let iy = -1
  const top = gap / 2
  for (let i = 1; i <= tileAmount; i += 1) {
    if (y < top + i * (size + gap)) {
      iy = i - 1
      break
    }
  }
  return ix * 10 + iy
}

const easeout = (elapsedTimeRate: number) => 1 - Math.pow(1 - elapsedTimeRate, 10)


// TODO:ネストしたスクエア
// TODO:ネストした子は無限にほわんほわんとその面積を広げながら、次に次に親の中で生まれ、消えていく
class Square {
  readonly defaultX: number
  readonly defaultY: number
  x: number
  y: number
  size: number
  radius = 8
  readonly createdAt: number

  constructor(x: number, y: number, size: number, createdAt: number) {
    this.defaultX = x
    this.defaultY = y
    this.x = x
    this.y = y
    this.size = size
    this.createdAt = createdAt
  }

  centX() {
    return this.x - size / 2
  }

  centY() {
    return this.y - size / 2
  }

  drawMe(p: p5, idx?: number) {
    p.push()
    p.fill(255)
    p.square(this.x - this.size / 2, this.y - this.size / 2, this.size, this.radius)
    p.fill(BG_COLOR)
    const innnerSize = this.size - 5
    p.square(this.x - innnerSize / 2, this.y - innnerSize / 2, innnerSize, this.radius)

    p.fill(255)
    p.textAlign("center", "center")
    if (typeof idx !== "undefined") {
      p.text(idx, this.x, this.y)
    }
    p.pop()
  }

  isFrameout(p: p5) {
    if (this.x < 0 || this.x > p.width) {
      return true
    }
    if (this.y + size / 2 < 0 || this.y - size / 2 - gap > p.height) {
      return true
    }
    return false
  }
}



const start = (node: HTMLElement) => {
  const param = {
    isPause: false
  }

  const sketch = (p: p5) => {
    p.setup = () => {
      const canvasSize = gap / 2 + size * tileAmount + gap * (tileAmount - 1) + gap / 2
      p.createCanvas(canvasSize, canvasSize)
      p.background(BG_COLOR)
      p.noStroke()

      const calcPosition = (n: number) => {
        return apearPoint + (gap + size) * n
      }
      new Array(tileAmount).fill(0).forEach((_, idx) => {
        squareList.push(...genSquareRow(calcMaxRowSize(p.width), gap / 2 + size / 2, calcPosition(idx), 0))
      })
    }


    let elapsed1 = 1
    let elapsed2 = 0
    p.draw = () => {
      p.background(BG_COLOR)

      if (Math.floor(p.frameCount / duration) % 2 == 0) {
        elapsed1 += 1
      } else {
        elapsed2 += 1
      }

      if (param.isPause) {
        squareList.forEach((s, idx) => {
          s.drawMe(p, idx)
        })
        return
      }


      squareList.filter((_, idx) => idx % 2 === 1).forEach(s => {
        const delta = elapsed1 - s.createdAt
        const elapsedTimeRate = delta % duration / duration
        const valueRate = easeout(elapsedTimeRate)
        const diffPosition = moveAmount * valueRate + moveAmount * Math.floor(delta / duration)
        s.y = (diffPosition + s.defaultY) % p.height
      })

      squareList.filter((_, idx) => Math.floor(idx / 10) % 2 === 1).forEach(s => {
        const delta = elapsed2 - s.createdAt
        const elapsedTimeRate = delta % duration / duration
        const valueRate = easeout(elapsedTimeRate)
        const diffPosition = moveAmount * valueRate + moveAmount * Math.floor(delta / duration)
        s.x = (diffPosition + s.defaultX) % p.width
      })


      squareList.forEach((s, idx) => {
        s.drawMe(p, idx)
      })

    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }

  const gui = new GUI();
  gui.add(param, 'isPause');
  new p5(sketch, node)
}


export default start
