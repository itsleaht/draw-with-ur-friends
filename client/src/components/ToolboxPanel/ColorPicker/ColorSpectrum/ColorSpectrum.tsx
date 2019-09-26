import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { rgbToHsl } from '../../../../helpers/utils'

import './_color-spectrum.styl'

type Props = {
  saturated: { h: number, s:number, l: number },
  isOpen: boolean,
  onSaturatedClb: (saturated: { h: number, s:number, l: number }) => void
}

const ColorSpectrum: FunctionComponent<Props> = ({ saturated, onSaturatedClb, isOpen}) => {

  const spectrumRef = useRef<HTMLCanvasElement>(null)
  const spectrumWrapperRef = useRef<HTMLDivElement>(null)

  const [cursorPos, setCursorPos] = useState<{x: number}>({x: 0})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [positions, setPositions] = useState<{minX: number, minY: number, maxX: number, maxY: number}>({minX: 0, minY: 0, maxX: 0, maxY: 0})

  const [ctx, setCtx] = useState<any>(null)

  const maxLight = 100
  const maxSaturation = 50
  const maxColorRadius = 360
  const newColorRadius = 60

  const spectrum = {
    width: spectrumRef.current && spectrumWrapperRef.current ? spectrumRef.current.clientWidth : 0,
    height: spectrumWrapperRef.current ? spectrumWrapperRef.current.clientHeight : 0,
    offsets: [ 0.00, 0.17, 0.33, 0.50, 0.67, 0.83, 1.00]
  }

  const createSpectrum = () => {
    if (spectrumRef && spectrumRef.current) {
      spectrumRef.current.width = spectrum.width
      spectrumRef.current.height = spectrum.height
      const ctx = spectrumRef.current.getContext('2d')
      const hueGradient = ctx!.createLinearGradient(0, 0, spectrum.width, 0)

      setCtx(ctx)

      let k = 0
      for (let i = 0; i <= maxColorRadius; i += newColorRadius) {
        hueGradient.addColorStop(spectrum.offsets[k], `hsl(${i}, ${maxLight}%, ${maxSaturation}%)`)
        k++
      }

      ctx!.fillStyle = hueGradient
      ctx!.fillRect(0, 0, spectrum.width, spectrum.height)
    }
  }

  const onSaturated = (saturated: { h: number, s:number, l: number }) => {
    onSaturatedClb(saturated)
  }

  const onMouseDown = () => {
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown) {
      getSaturated(e)
    }
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    getSaturated(e.nativeEvent)
  }


  const getSaturated = (e: MouseEvent) => {
    const cursorX =  e.pageX
    const cursorY = e.pageY

    if (spectrumWrapperRef.current &&
      cursorX >= positions.minX &&
      cursorX <= positions.maxX &&
      cursorY >= positions.minY &&
      cursorY <= positions.maxY
      ) {
      const x = Math.round(e.pageX - positions.minX)
      const selectedSaturated = ctx.getImageData(x, (spectrum.height / 2), 1, 1).data

      onSaturated(rgbToHsl(selectedSaturated[0], selectedSaturated[1], selectedSaturated[2]))
    } else {
      onMouseUp()
    }
  }

  const moveCursor = () => {
    if (spectrumWrapperRef.current) {
      setCursorPos({
        x: (spectrum.width * saturated.h) / maxColorRadius
      })
    }
  }

  const setSpectrumPositions = () => {
    if (spectrumRef && spectrumRef.current && isOpen) {
      const bounding = spectrumRef.current.getBoundingClientRect()
      setPositions({
        minX: bounding.left,
        minY: bounding.top,
        maxX: bounding.right,
        maxY: bounding.bottom
      })
    }
  }

  const onTransitionEnd = () => {
    setSpectrumPositions()
  }

  useEffect(() => {
    if (spectrumRef && spectrumRef.current) {
      createSpectrum()
      setSpectrumPositions()
      moveCursor()
    }
  }, [spectrumRef, spectrum.width])

  useEffect(() => {
    moveCursor()
  }, [saturated])


  useEffect(() => {
    if (isMouseDown)
      document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [isMouseDown])

  return(
    <div className={`color__spectrum--gradient ${isOpen ? 'is-open' : ''}`} ref={spectrumWrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onClick={onClick}>
      <canvas className="color__spectrum" ref={spectrumRef} onTransitionEnd={onTransitionEnd} />
      <span className="color__cursor" style={{left: cursorPos.x}} />
    </div>
  )
}

export default ColorSpectrum
