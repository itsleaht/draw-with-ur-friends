import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import './_color-gradient.styl'
import { hslToString, rgbToString } from '../../../../helpers/utils'
import { ColorState } from '../../../../@types'

type Props = {
  color: ColorState,
  saturated: {h: number, s: number, l: number},
  isOpen: boolean,
  onColorClb: (color: string) => void
}

const ColorGradient: FunctionComponent<Props> = ({ color, saturated, onColorClb, isOpen}) => {
  const gradientRef = useRef<HTMLCanvasElement>(null)
  const gradientWrapperRef = useRef<HTMLDivElement>(null)
  const gradientSize = {
    width: gradientWrapperRef.current ? gradientWrapperRef.current.clientWidth : 0
  }

  const [cursorPos, setCursorPos] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [positions, setPositions] = useState<{minX: number, minY: number, maxX: number, maxY: number}>({minX: 0, minY: 0, maxX: 0, maxY: 0})
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

  const getColor = (e: MouseEvent) => {
    const cursorX =  e.pageX
    const cursorY = e.pageY

    if (gradientWrapperRef.current &&
        cursorX >= positions.minX &&
        cursorX <= positions.maxX &&
        cursorY >= positions.minY &&
        cursorY <= positions.maxY
      ) {
      const x = Math.round(e.pageX - positions.minX)
      const y = Math.round(e.pageY - positions.minY)
      const selectedColor = ctx.getImageData(x, y, 1, 1).data
      onColorClb(rgbToString(selectedColor[0], selectedColor[1], selectedColor[2]))
    } else {
      onMouseUp()
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

  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown) {
      getColor(e)
    }
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    getColor(e.nativeEvent)
  }

  const onTransitionEnd = () => {
    if (gradientRef && gradientRef.current && isOpen) {
      const bounding = gradientRef.current.getBoundingClientRect()
      setPositions({
        minX: bounding.left,
        minY: bounding.top,
        maxX: bounding.right,
        maxY: bounding.bottom
      })
    }
  }


  useEffect(() => {
    moveCursor()
  }, [color])

  useEffect(() => {
    if (isMouseDown)
      document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [isMouseDown])

  useEffect(() => {
    if (gradientWrapperRef && gradientWrapperRef.current) {
      createGradient()
    }
  }, [gradientWrapperRef, saturated])

  return (
    <div className={`color__wrapper--gradient ${isOpen ? 'is-open' : ''}`} ref={gradientWrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick}>
      <canvas className="color__gradient" ref={gradientRef} onTransitionEnd={onTransitionEnd} />
      <span className="color__cursor" style={{top: cursorPos.y, left: cursorPos.x}} />
    </div>
  )
}

export default ColorGradient
