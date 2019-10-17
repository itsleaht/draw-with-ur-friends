import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import p5 from 'p5';

import './_draw-canvas.styl'
import DrawingManager from '../../modules/DrawingManager';
import { State } from '../../store/types';
import appSelector from '../../store/selectors/appSelector';
import { slugify } from '../../helpers/utils';
import { IRoom } from '../../@types';

const DrawCanvas: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvas, setCanvas] = useState<any>(null)
  const room = useSelector<State, IRoom>(appSelector.room)

  useEffect( () => {
    if (containerRef && containerRef.current) {
      const sketch = (s: any) => {
        const size = {
          width: containerRef.current!.clientWidth,
          height: containerRef.current!.clientHeight
        }
        s.draw = () => {}
        s.setup = () => {
          s.background(255)
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

  const onCanvasSave = () => {
    const date = new Date()
    const dateYMD = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const dateHM = `${hour < 10 ? `0${hour}` : hour}${minutes < 10 ? `0${minutes}` : minutes}`
    const fileName = `${dateYMD}-${dateHM}-DWUF-${slugify(room.name)}`
    canvas.save(fileName)
  }

  useEffect(() =>  {
    return () => {
      DrawingManager.kill()
    }
  }, [])


  useEffect(() =>  {
    window.addEventListener('canvas:save', onCanvasSave)
    return () => {
      window.removeEventListener('canvas:save', onCanvasSave)
    }
  }, [canvas, room])

  return (
    <div className="draw--canvas">
      <div className="draw__inner" ref={containerRef} />
    </div>
  )
}

export default DrawCanvas
