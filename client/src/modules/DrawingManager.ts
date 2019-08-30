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
    console.log('SKETCH', sketch.canvas, this.sketch.canvas)
  }

  setBrush(brush: Brush) {
    this.brush = brush
  }

  setBrushes() {
    const formerBrushes = this.brushes
    console.log(this.sketch.canvas)
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
    this.sketch.fill(point.color.hex)
    this.sketch.noStroke()
    this.sketch.circle(point.pos.x, point.pos.y, this.brushes[point.brush.index])
  }

  onMouseDragged () {
    this.draw({
      color: this.color,
      brush: this.brush,
      pos: {
        x: this.sketch.mouseX,
        y: this.sketch.mouseY
      }
    })
  }

  onResize() {
    this.setBrushes()
  }


}

export default new DrawingManager()
