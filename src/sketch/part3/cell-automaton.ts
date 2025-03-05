import p5 from 'p5'
import { Cell, Rule } from './Cell'
import GUI from 'lil-gui'

export const start = (node: HTMLElement) => {

  const sketch = (p: p5) => {
    const param: { rule: Rule } = {
      rule: "GOL"
    }

    let numx = 0
    let numy = 0
    let cellArray: Cell[][] = []

    p.setup = () => {
      p.createCanvas(1000, 800);
      numx = Math.floor(p.width / Cell.SIZE)
      numy = Math.floor(p.height / Cell.SIZE)
      p.frameRate(10)
      restart()
    }

    const restart = () => {
      cellArray = []
      for (let x = 0; x < numx; x += 1) {
        const arr: Cell[] = []
        for (let y = 0; y < numy; y += 1) {
          arr.push(new Cell(x, y))
        }
        cellArray.push(arr)
      }

      for (let x = 0; x < numx; x += 1) {
        for (let y = 0; y < numy; y += 1) {
          let a = y - 1
          let b = y + 1
          let l = x - 1
          let r = x + 1

          if (a < 0) a = numy - 1
          if (b == numy) b = 0
          if (l < 0) l = numx - 1
          if (r == numx) r = 0

          cellArray[x][y].addNeighbour(cellArray[l][a])
          cellArray[x][y].addNeighbour(cellArray[l][y])
          cellArray[x][y].addNeighbour(cellArray[l][b])
          cellArray[x][y].addNeighbour(cellArray[x][b])
          cellArray[x][y].addNeighbour(cellArray[r][b])
          cellArray[x][y].addNeighbour(cellArray[r][y])
          cellArray[x][y].addNeighbour(cellArray[r][a])
          cellArray[x][y].addNeighbour(cellArray[x][a])
        }
      }
    }

    p.draw = () => {
      p.background(255);
      cellArray.forEach(arr =>
        arr.forEach(cell => {
          cell.calcNextState(param.rule)
        })
      )

      p.translate(Cell.SIZE / 2, Cell.SIZE / 2)

      cellArray.forEach(arr =>
        arr.forEach(cell => {
          cell.drawMe(p)
        })
      )
    }

    const gui = new GUI();
    const rules: Rule[] = ["GOL", "Gerrard"]
    gui.add(param, "rule", rules)
    gui.onChange(event => {
      if (event.property === "rule") {
        restart()
      }
    })

  }
  new p5(sketch, node)
}

