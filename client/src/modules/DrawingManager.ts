import { store } from "../store"
import p5 from 'p5'
import { Events } from "../config/events"
import SocketManager from "./SocketManager"
import { Line, LineIndex } from "../@types"
import { addLog } from "../helpers/utils"

const baseBrush:  {[key: string]: number}  = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20
}
const refHeight = 698
const refWidth = refHeight / (9 / 16)
const draw: LineIndex  = {
  brush: 0,
  color: 1,
  x: 2,
  y: 3,
  pX: 4,
  pY: 5
}

class DrawingManager {
  private sketch: any = new p5(() => {})
  private sketchSize: { width: number, height : number } = { width : 0, height : 0 }
  private canDraw: boolean = store.getState().app.ui.canDraw
  private brush: string = ''
  private color: string = ''
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
      if (this.brush !== state.draw.brush.index) {
        this.setBrush(state.draw.brush.index)
      }
      if (this.color !== state.draw.color.hex) {
        this.setColor(state.draw.color.hex)
      }
      if (this.canDraw !== state.app.ui.canDraw) {
        this.setCanDraw(state.app.ui.canDraw)
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

  setBrush(brush: string) {
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

  setColor(color: string) {
    this.color = color
  }

  setCanDraw(canDraw: boolean) {
    this.canDraw = canDraw
  }

  createLine() {

    const lineArr: Line = [
      this.brush,
      this.color,
      ( this.sketch.mouseX * refWidth ) / this.sketchSize.width,
      ( this.sketch.mouseY * refHeight ) / this.sketchSize.height,
      ( this.sketch.pmouseX * refWidth ) / this.sketchSize.width,
      ( this.sketch.pmouseY * refHeight ) / this.sketchSize.height
    ]
    // this.draw(line)

    SocketManager.emit(Events.RoomAddDrawLine, {
      room: { id: store.getState().app.room!.id },
      drawLine: lineArr
    })
  }

  clear () {
    addLog('on', 'DrawingManager : Clear')
    this.sketch.clear()
  }

  draw (line: Line) {
    if (line) {
      const drawBrush = line[draw.brush]
      const drawColor = line[draw.color]
      if (drawBrush && this.brushes[drawBrush] && drawColor) {
        this.sketch.stroke(drawColor)
        this.sketch.strokeWeight(this.brushes[drawBrush])
      }

      // TODO line interpolation if sketchHeight > than refHeight
      const drawPos: {x: number, y: number, pX: number, pY: number} = {
        x: Number(line[draw.x]),
        y:  Number(line[draw.y]),
        pX:  Number(line[draw.pX]),
        pY:  Number(line[draw.pY])
      }
      if (drawPos.x && drawPos.y && drawPos.pX && drawPos.pY) {
        this.sketch.line(
          ( drawPos.x * this.sketchSize.width ) / refWidth,
          ( drawPos.y * this.sketchSize.height ) / refHeight,
          ( drawPos.pX * this.sketchSize.width ) / refWidth,
          ( drawPos.pY * this.sketchSize.height ) / refHeight
        )
      }
    }
  }

  drawAll (lines: Line[]) {
    addLog('on', 'DrawingManager : DrawAll')
    this.clear()
    lines.forEach((line: Line) => {
      this.draw(line)
    })
  }

  onMouseClicked() {
    if (this.canDraw) {
      this.createLine()
    }
  }

  onMouseDragged () {
    if (this.canDraw) {
      this.createLine()
    }
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
