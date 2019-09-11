import { Brush, Color } from "../store/types"
import { store } from "../store"
import p5 from 'p5'
import { Events } from "../config/events"
import SocketManager from "./SocketManager"
import { Line } from "../@types"
import { addLog } from "../helpers/utils"

const baseBrush:  {[key: string]: number}  = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20
}
const refHeight = 698
const refWidth = refHeight / (9 / 16)

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
      changeRoomClb: (drawLines: Line[]) => {
        this.drawAll(drawLines)
      }
    })
  }

  //Todo: room change = clear canvas + drawAll

  public kill () {
    addLog('on', 'DrawingManager : Kill')
    if (this.sketch) {
      this.sketch.remove()
    }
  }

  init() {
    addLog('on', 'DrawingManager : Init')
    store.subscribe(() => {
      const state = store.getState()
      if (this.brush !== state.draw.brush) {
        this.setBrush(state.draw.brush)
      }
      if (this.color !== state.draw.color ) {
        this.setColor(state.draw.color)
      }
    })
  }

  setSketch(sketch: any) {
    addLog('on', 'DrawingManager : Set Sketch')
    this.sketch = sketch
    this.setSketchSize()
    this.setBrushes()

    const drawLines = store.getState().app.room.drawLines
    if (drawLines)
      this.drawAll(drawLines)
  }

  onSetup() {
    this.setSketchSize()
    addLog('on', 'DrawingManager : Setup')
  }

  setBrush(brush: Brush) {
    this.brush = brush
  }

  setBrushes() {
    addLog('on', 'DrawingManager : Set Brushes')

    Object.keys(baseBrush).forEach( (key: string) => {
      const brush = baseBrush[key]
      const coef = this.sketchSize.height / refHeight
      this.brushes[key] = ( brush * coef )
    })
  }

  setSketchSize() {
    addLog('on', 'DrawingManager : Set Sketch Size')
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

    SocketManager.emit(Events.RoomAddDrawLine, {
      room: { id: store.getState().app.room!.id },
      drawLine: line
    })
  }

  clear () {
    addLog('on', 'DrawingManager : Clear')
    this.sketch.clear()
  }

  draw (line: Line) {
    // addLog('on', 'DrawingManager : Draw')
    if (line) {
      if (line.color.hex && this.brushes[line.brush.index]) {
        this.sketch.stroke(line.color.hex)
        this.sketch.strokeWeight(this.brushes[line.brush.index])
      }

      // TODO line interpolation if sketchHeight > than refHeight
      if (line.posRatio.x && line.posRatio.y && line.posRatio.pX && line.posRatio.pY) {
        this.sketch.line(
          ( line.posRatio.x * this.sketchSize.width ) / refWidth,
          ( line.posRatio.y * this.sketchSize.height ) / refHeight,
          ( line.posRatio.pX * this.sketchSize.width ) / refWidth,
          ( line.posRatio.pY * this.sketchSize.height ) / refHeight
        )
      }
    }
  }

  drawAll (lines: Line[]) {
    addLog('on', 'DrawingManager : DrawAll')
    this.clear()
    lines.forEach((line) => {
      this.draw(line)
    })
  }

  onMouseClicked() {
    this.createLine()
  }

  onMouseDragged () {
    this.createLine()
  }

  retrieveDraw () {
    this.setSketchSize()
    this.setBrushes()
    const drawLines = store.getState().app.room.drawLines
    if (drawLines)
      this.drawAll(drawLines)
  }

  onResize() {
    addLog('on', 'DrawingManager : Resize')
    this.retrieveDraw()
  }
}

export default new DrawingManager()
