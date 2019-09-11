import { Brush, Color } from "../store/types"
import { store } from "../store"
import p5 from 'p5'
import { Events } from "../config/events";
import SocketManager from "./SocketManager";
import { Line } from "../@types";

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

    SocketManager.setClbs({
      drawLineClb: (drawLine: Line) => {
        this.draw(drawLine)
      },
      getRoomClb: (drawLines: Line[]) => {
        // this.drawAll(drawLines)
      }
    })
  }

  //Todo: room change = clear canvas + drawAll


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

    const drawLines = store.getState().app.room.drawLines
    if (drawLines)
      this.drawAll(drawLines)
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

  createLine() {
    const line: Line = {
      color: this.color,
      brush: this.brush,
      posRatio : {
        x: ( this.sketch.mouseX * refWidth ) / this.sketchSize.width,
        y: ( this.sketch.mouseY * refHeight ) / this.sketchSize.height,
        pX: ( this.sketch.pmouseX * refWidth ) / this.sketchSize.width,
        pY: ( this.sketch.pmouseY * refHeight ) / this.sketchSize.height
      }
    }

    this.draw(line)
    // store.dispatch({ type: ActionTypes.SetRoomDrawLine, payload: { drawPoint: line }})
    SocketManager.emit(Events.RoomAddDrawLine, {
      room: { id: store.getState().app.room!.id },
      drawLine: line
    })
  }

  draw (line: Line) {
    this.sketch.stroke(line.color.hex)
    this.sketch.strokeWeight(this.brushes[line.brush.index])

    // TODO line interpolation if sketchHeight > than refHeight

    this.sketch.line(
      ( line.posRatio.x * this.sketchSize.width ) / refWidth,
      ( line.posRatio.y * this.sketchSize.height ) / refHeight,
      ( line.posRatio.pX * this.sketchSize.width ) / refWidth,
      ( line.posRatio.pY * this.sketchSize.height ) / refHeight
    )
  }

  drawAll (lines: Line[]) {
    // this.sketch.clear()

    // lines.forEach((line) => {
    //   this.draw(line)
    // })
  }

  onMouseClicked() {
    this.createLine()
  }

  onMouseDragged () {
    this.createLine()
  }

  onResize() {
    this.setBrushes()
    this.setSketchSize()
    const drawLines = store.getState().app.room.drawLines
    if (drawLines)
      this.drawAll(drawLines)
  }
}

export default new DrawingManager()
