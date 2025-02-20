
import p5 from 'p5'
export const start = (node: HTMLElement) => {
  const sketch = (p: p5) => {
    const BG_COLOR = 10;
    p.setup = () => {
      p.colorMode("hsb");
      p.noFill();
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.background(BG_COLOR)
    }

    const line = 100;
    const segment = 100;

    p.draw = () => {
      const t = performance.now() / 1000
      p.background(BG_COLOR)
      // const h = Math.round((j / lineNum) * 60) + 280; // 色相
      // const s = 100; // 彩度
      // const l = Math.round((j / lineNum) * 75) + 25; // 明度
      // p.stroke(h, s, l);
      p.stroke(255);

      Array(line).fill(0).forEach((_, outerIdx) => {
        const noiseCoefficient = 50 + outerIdx // ノイズステップの分割数 大きいほど、細かいノイズ目
        const py = outerIdx / noiseCoefficient // 線毎にpyは同じものを使う

        p.beginShape();
        Array(segment).fill(0).forEach((_, innerIdx) => {
          const x = innerIdx / segment * p.width
          const px = innerIdx / noiseCoefficient
          // HACK: 第1引数,第2引数のどちらに時間を加えるかで変化具合が違う...
          // これは、なんでだろう... Perlinノイズの仕組みをちゃんとわからないといけないな...
          // 第1引数だと横に流れるような印象, 第2引数だと盾になびくような印象をうける...
          const y = p.height * p.noise(px, py + t / 5);
          p.vertex(x, y)
        })
        p.endShape();
      })

    }

  }
  new p5(sketch, node)
}



