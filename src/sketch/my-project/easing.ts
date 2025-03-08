import p5 from "p5"

const BG_COLOR = 0
const duration = 2000
const startValue = 100;
const deltaValue = (w: number) => w - 200

// イージングで重要な概念はelapsedRateをx軸として
// valueRate = f(x) を y軸として考えること

// elapsedRate = min(経過時間 / 変化完了時間, 1) で0~1の域で定義される
// valueRate = f(elapsedRate) で定義され、値域は0~1であるような関数 f(1) = 1になってほしい

// const elapsedRate = (elapsed: number) => Math.min(1, elapsed / duration)
// const valueRate = (elapsedRate: number) => Math.pow(elapsedRate, 10)


const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(BG_COLOR)
      p.noStroke()
    }

    const linePoints: number[] = []
    p.draw = () => {
      p.background(BG_COLOR)
      const elapsed = Math.min(duration, p.millis())
      const elapsedRate = elapsed / duration
      const deltaValueRate = Math.pow(elapsedRate, 10)

      p.push()
      p.stroke(200)
      p.strokeWeight(5)
      if (p.frameCount <= 120) {
        linePoints.push(100 + 100 * elapsedRate, 200 - 100 * deltaValueRate)
      }
      if (p.frameCount >= 2) {
        for (let i = 0; i <= linePoints.length; i += 2) {
          p.line(linePoints[i], linePoints[i + 1], linePoints[i + 2], linePoints[i + 3])
        }
      }
      p.pop()

      p.circle(startValue + deltaValue(p.width) * deltaValueRate, p.height / 2, 100)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }

  new p5(sketch, node)
}


export default start
