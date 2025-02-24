import p5 from "p5";

export class Cell {
  x: number
  y: number
  state: boolean
  nextState: boolean
  neighbours: Cell[]

  static readonly SIZE: number = 20

  constructor(ex: number, why: number) {
    this.x = ex * Cell.SIZE;
    this.y = why * Cell.SIZE;
    if (Math.random() * 2 > 1) {
      this.nextState = true;
    } else {
      this.nextState = false;
    }
    this.state = this.nextState
    this.neighbours = [];
  }

  addNeighbour(cell: Cell) {
    this.neighbours.push(cell)
  }

  calcNextState() {
    const alive = this.neighbours.reduce((prev, curr) => prev + (curr.state ? 1 : 0), 0)
    if (this.state) {
      if (alive === 2 || alive === 3) {
        this.nextState = true
      } else {
        this.nextState = false
      }
    } else {
      if (alive === 3) {
        this.nextState = true
      } else {
        this.nextState = false
      }
    }

  }

  drawMe(p: p5) {
    this.state = this.nextState
    p.stroke(0)
    if (this.state) {
      p.fill(0)
    } else {
      p.fill(255)
    }
    p.ellipse(this.x, this.y, Cell.SIZE, Cell.SIZE);
  }
}
