import { Brush, Color, Point } from "../store/types"
import { store } from "../store"
import p5 from 'p5'
import { ActionTypes } from "../store/actionTypes";

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
  private brushes: {[key: string]: number} = { ...baseBrush }
  private refRatio: number = 1024 / 576 // TODO use real ratio
  private refWidthRatio: number = 1024 // TODO  define width with height ratio
  private refHeightRatio = 576


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
    Object.keys(baseBrush).forEach( (key: string) => {
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

    this.sketch.line(
      point.posRatio.x * window.innerWidth / this.refWidthRatio,
      point.posRatio.y * window.innerHeight / this.refHeightRatio,
      point.posRatio.pX * window.innerWidth / this.refWidthRatio,
      point.posRatio.pY * window.innerHeight / this.refHeightRatio
    )
  }

  drawAll (points: Point[]) {
    points.forEach((point) => {
      this.draw(point)
    })
  }

  onMouseDragged () {
    const ratio =  window.innerWidth / window.innerHeight
    const point: Point = {
      color: this.color,
      brush: this.brush,
      pos: {
        x: this.sketch.mouseX,
        y: this.sketch.mouseY,
        pX: this.sketch.pmouseX,
        pY: this.sketch.pmouseY
      },
      posRatio : {
        x: ( this.sketch.mouseX * this.refWidthRatio ) / window.innerWidth,
        y: ( this.sketch.mouseY * this.refHeightRatio ) / window.innerHeight,
        pX: ( this.sketch.pmouseX * this.refWidthRatio ) / window.innerWidth,
        pY: ( this.sketch.pmouseY * this.refHeightRatio ) / window.innerHeight
      }
    }
    this.draw(point)
    store.dispatch({ type: ActionTypes.SetDrawPoints, payload: { drawPoint: point }})
  }

  onResize() {
    this.setBrushes()
    this.drawAll(store.getState().app.drawPoints)
  }
}

export default new DrawingManager()
