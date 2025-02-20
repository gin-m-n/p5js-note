
import p5 from 'p5'
export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 10;
    p.setup = () => {
      p.colorMode("hsb");
      p.noFill();
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.frameRate(30)
      p.background(BG_COLOR)
    }

    const segment = 50;

    p.draw = () => {
      const t = performance.now() / 1000
      p.background(BG_COLOR)
      // const h = Math.round((j / lineNum) * 60) + 280; // 色相
      // const s = 100; // 彩度
      // const l = Math.round((j / lineNum) * 75) + 25; // 明度
      // p.stroke(h, s, l);
      p.stroke(255)

      p.beginShape();
      Array(segment + 1).fill(0).forEach((_, i) => {
        const x = i / segment * p.width
        const radian = i / segment * 2 * Math.PI + t
        const y = p.height / 2 + 300 * p.sin(radian)
        p.vertex(x, y)
      })
      p.endShape();
    }

  }
  new p5(sketch, node)
}



