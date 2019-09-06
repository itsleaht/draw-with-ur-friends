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
const refHeight = 698
const refWidth = refHeight / (9 / 16)
const refRatio = refWidth / refHeight

class DrawingManager {
  private sketch: any = new p5(() => {})
  private sketchSize: { width: number, height : number } = { width : 0, height : 0 }
  private brush: Brush = { index: '' }
  private color: Color = { hex: '' }
  private brushes: {[key: string]: number} = { ...baseBrush }

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

  onSetup() {
    this.setSketchSize()
  }

  setBrush(brush: Brush) {
    this.brush = brush
  }

  setBrushes() {
    Object.keys(baseBrush).forEach( (key: string) => {
      const brush = baseBrush[key]
      const screenRatio = window.innerWidth / window.innerHeight
      this.brushes[key] = ( brush * screenRatio ) / refRatio
    })
  }

  setSketchSize() {
    if (this.sketch && this.sketch.canvas) {
      this.sketchSize = {
        width: this.sketch.canvas.clientWidth,
        height: this.sketch.canvas.clientHeight
      }
    }
  }

  setColor(color: Color) {
    this.color = color
  }

  createPoint() {
    const point: Point = {
      color: this.color,
      brush: this.brush,
      posRatio : {
        x: ( this.sketch.mouseX * refWidth ) / this.sketchSize.width,
        y: ( this.sketch.mouseY * refHeight ) / this.sketchSize.height,
        pX: ( this.sketch.pmouseX * refWidth ) / this.sketchSize.width,
        pY: ( this.sketch.pmouseY * refHeight ) / this.sketchSize.height
      }
    }

    this.draw(point)
    store.dispatch({ type: ActionTypes.SetDrawPoints, payload: { drawPoint: point }})
  }

  draw (point: Point) {
    this.sketch.stroke(point.color.hex)
    this.sketch.strokeWeight(this.brushes[point.brush.index])

    // TODO line interpolation if sketchHeight > than refHeight

    this.sketch.line(
      ( point.posRatio.x * this.sketchSize.width ) / refWidth,
      ( point.posRatio.y * this.sketchSize.height ) / refHeight,
      ( point.posRatio.pX * this.sketchSize.width ) / refWidth,
      ( point.posRatio.pY * this.sketchSize.height ) / refHeight
    )
  }

  drawAll (points: Point[]) {
    points.forEach((point) => {
      this.draw(point)
    })
  }

  onMouseClicked() {
    this.createPoint()
  }

  onMouseDragged () {
    this.createPoint()
  }

  onResize() {
    this.setBrushes()
    this.setSketchSize()
    this.drawAll(store.getState().app.drawPoints)
  }
}

export default new DrawingManager()
