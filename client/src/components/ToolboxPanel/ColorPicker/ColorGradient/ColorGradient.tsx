import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import './_color-gradient.styl'
import { hslToString, rgbToString } from '../../../../helpers/utils'
import { ColorState } from '../../../../@types'

type Props = {
  color: ColorState,
  saturated: {h: number, s: number, l: number}
  onColorClb: (color: string) => void
}

const ColorGradient: FunctionComponent<Props> = ({ color, saturated, onColorClb}) => {
  const gradientRef = useRef<HTMLCanvasElement>(null)
  const gradientWrapperRef = useRef<HTMLDivElement>(null)
  const gradientSize = {
    width: gradientWrapperRef.current ? gradientWrapperRef.current.clientWidth : 0
  }

  const [cursorPos, setCursorPos] = useState<{x: number, y: number}>({x: 0, y:0})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [ctx, setCtx] = useState<any>(null)

  const createGradient = () => {
    if (gradientRef && gradientRef.current) {
      gradientRef.current.height = gradientSize.width
      gradientRef.current.width = gradientSize.width

      setCtx(gradientRef.current.getContext('2d'))
      if (ctx) {
        const whiteGradient = ctx.createLinearGradient(0, 0, gradientSize.width, 0)
        whiteGradient.addColorStop(0, "#fff")
        whiteGradient.addColorStop(1, hslToString(saturated.h, saturated.s, saturated.l))
        ctx.fillStyle = whiteGradient
        ctx.fillRect(0, 0, gradientSize.width, gradientSize.width)

        const blackGradient = ctx.createLinearGradient(0, 0, 0, gradientSize.width)
        blackGradient.addColorStop(0, "transparent")
        blackGradient.addColorStop(1, "#000")
        ctx.fillStyle = blackGradient
        ctx.fillRect(0, 0, gradientSize.width, gradientSize.width)
      }
    }
  }

  const getColor = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gradientWrapperRef.current) {
      const x = Math.round(e.nativeEvent.offsetX)
      const y = Math.round(e.nativeEvent.offsetY)

      const selectedColor = ctx.getImageData(x, y, 1, 1).data
      onColorClb(rgbToString(selectedColor[0], selectedColor[1], selectedColor[2]))
    }
  }

  const moveCursor = () => {
    setCursorPos({
      x: ( color.hsv.s / 100 ) * gradientSize.width,
      y: gradientSize.width - (( color.hsv.v / 100 ) * gradientSize.width)
    })
  }

  const onMouseDown = () => {
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
  }

  const onMouseMoveGradient = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      getColor(e)
    }
  }

  useEffect(() => {
    moveCursor()
  }, [color])


  useEffect(() => {
    if (gradientWrapperRef && gradientWrapperRef.current) {
      createGradient()
    }
  }, [gradientWrapperRef, saturated])

  return (
    <div className="color__wrapper--gradient" ref={gradientWrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMoveGradient}>
      <canvas className="color__gradient" ref={gradientRef} />
      <span className="color__cursor" style={{top: cursorPos.y, left: cursorPos.x}} />
    </div>
  )
}

export default ColorGradient
