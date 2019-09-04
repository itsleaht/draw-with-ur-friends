import { Brush, Color, Point } from "../store/types"
import { store } from "../store"
import p5 from 'p5'

const baseBrush:  {[key: string]: number}  = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20
}
class DrawingManager {
  private sketch: any = new p5(() => {})
  private brush: Brush = { index: '' }
  private color: Color = { hex: '' }
  private brushes: {[key: string]: number} = baseBrush
  private refRatio: number = 1024 / 576


  constructor() {
    this.init()
  }

  init() {
    store.subscribe(() => {
      this.setBrush(store.getState().draw.brush)
      this.setColor(store.getState().draw.color)
    })
  }

  setSketch(sketch: any) {
    this.sketch = sketch
    this.setBrushes()
  }

  setBrush(brush: Brush) {
    this.brush = brush
  }

  setBrushes() {
    const formerBrushes = this.brushes
    Object.keys(formerBrushes).forEach( (key: string) => {
      const brush = baseBrush[key]
      const screenRatio = window.innerWidth / window.innerHeight
      this.brushes[key] = ( brush * screenRatio ) / this.refRatio
    })
  }

  setColor(color: Color) {
    this.color = color
  }

  draw (point: Point) {
    this.sketch.stroke(point.color.hex)
    this.sketch.strokeWeight(this.brushes[point.brush.index])
    this.sketch.line(point.pos.x, point.pos.y, point.pos.pX, point.pos.pY)
  }

  onMouseDragged () {
    const point: Point = {
      color: this.color,
      brush: this.brush,
      pos: {
        x: this.sketch.mouseX,
        y: this.sketch.mouseY,
        pX: this.sketch.pmouseX,
        pY: this.sketch.pmouseY
      }
    }
    this.draw(point)
  }

  onResize() {
    this.setBrushes()
  }


}

export default new DrawingManager()
