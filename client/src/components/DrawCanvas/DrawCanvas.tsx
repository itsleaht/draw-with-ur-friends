import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Color, State, Brush } from '../../store/types'
import p5 from 'p5';

import './_draw-canvas.styl'
import DrawingManager from '../../modules/DrawingManager';

const DrawCanvas: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvas, setCanvas] = useState<any>(null)
  const color = useSelector<State, Color>(state => state.draw.color)
  const brush = useSelector<State, Brush>(state => state.draw.brush)

  useEffect( () => {
    if (containerRef && containerRef.current) {
      const sketch = (s: any) => {
        const size = {
          width: containerRef.current!.clientWidth,
          height: containerRef.current!.clientHeight
        }
        s.draw = () => {}
        s.setup = () => {
          s.createCanvas(size.width, size.height)
          s.canvas.classList.add('canvas')
          DrawingManager.onSetup()
        }
        s.mouseDragged = () => DrawingManager.onMouseDragged()
        s.mouseClicked = () => DrawingManager.onMouseClicked()

        s.windowResized = () => {
          s.resizeCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
          DrawingManager.onResize()
        }
      }

      const canvas = new p5(sketch, containerRef.current)
      setCanvas(canvas)
      DrawingManager.setSketch(canvas)
    }
  }, [containerRef])

  useEffect(() =>  {
    return () => {
      DrawingManager.kill()
    }
  }, [])

  return (
    <div className="draw--canvas">
      <div className="draw__inner" ref={containerRef} />
    </div>
  )
}

export default DrawCanvas
