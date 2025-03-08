import GUI from "lil-gui"
import p5 from "p5"

const BG_COLOR = 0
const duration = 4000

const easeout = (elapsedTimeRate: number) => 1 - Math.pow(1 - elapsedTimeRate, 4)

const param = {
  line: 31,
  strokeWeight: 8,
  radius: 100,
  radiusStep: 22,
  thetaStep: 24,
}

const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(BG_COLOR)

      p.stroke(255)
      p.strokeCap("round")
      p.noFill()
    }

    p.draw = () => {
      p.background(BG_COLOR)
      p.strokeWeight(param.strokeWeight)
      const now = performance.now()

      const elapsedRate = ((now) % duration) / duration
      const valueRate = easeout(elapsedRate)

      const elapsedRate2 = ((now + duration / 3) % duration) / duration
      const valueRate2 = easeout(elapsedRate2)

      const theta = 2 * Math.PI * valueRate
      const theta2 = 2 * Math.PI * valueRate2

      const thetaStepRad = Math.PI / 180 * param.thetaStep


      new Array(param.line).fill(0).forEach((_, idx) => {
        p.arc(p.width / 2, p.height / 2,
          param.radius + param.radiusStep * idx, param.radius + param.radiusStep * idx,
          thetaStepRad * idx + theta, thetaStepRad * idx + theta2);
      })
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }

  const gui = new GUI();
  gui.add(param, 'line', 1, 200, 1);
  gui.add(param, 'strokeWeight');
  gui.add(param, 'radiusStep');
  gui.add(param, 'thetaStep');
  gui.add(param, 'radius');
  new p5(sketch, node)
}


export default start
