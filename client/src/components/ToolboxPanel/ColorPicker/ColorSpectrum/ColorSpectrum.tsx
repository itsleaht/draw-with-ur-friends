import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { rgbToHsl } from '../../../../helpers/utils';

import './_color-spectrum.styl';

type Props = {
  saturated: { h: number, s:number, l: number },
  onSaturatedClb: (saturated: { h: number, s:number, l: number }) => void
}

const ColorSpectrum: FunctionComponent<Props> = ({ saturated, onSaturatedClb}) => {

  const spectrumRef = useRef<HTMLCanvasElement>(null)
  const spectrumWrapperRef = useRef<HTMLDivElement>(null)

  const [cursorPos, setCursorPos] = useState<{x: number}>({x: 0})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

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
      const ctx = spectrumRef.current.getContext('2d');
      const hueGradient = ctx!.createLinearGradient(0, 0, spectrum.width, 0);

      setCtx(ctx)

      let k = 0;
      for (let i = 0; i <= maxColorRadius; i += newColorRadius) {
        hueGradient.addColorStop(spectrum.offsets[k], `hsl(${i}, ${maxLight}%, ${maxSaturation}%)`);
        k++
      }

      ctx!.fillStyle = hueGradient;
      ctx!.fillRect(0, 0, spectrum.width, spectrum.height);
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

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      getSaturated(e)
    }
  }

  const getSaturated = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spectrumWrapperRef.current) {
      const x = Math.round(e.nativeEvent.offsetX);
      const selectedSaturated = ctx.getImageData(x, (spectrum.height / 2), 1, 1).data;

      onSaturated(rgbToHsl(selectedSaturated[0], selectedSaturated[1], selectedSaturated[2]))
    }
  }

  const moveCursor = () => {
    if (spectrumWrapperRef.current) {
      setCursorPos({
        x: (spectrum.width * saturated.h) / maxColorRadius
      })
    }
  }

  useEffect(() => {
    if (spectrumRef && spectrumRef.current) {
      createSpectrum()
      moveCursor()
    }
  }, [spectrumRef, spectrum.width])

  useEffect(() => {
    moveCursor()
  }, [saturated])

  return(
    <div className="color__spectrum--gradient" ref={spectrumWrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} >
      <canvas className="color__spectrum" ref={spectrumRef} />
      <span className="color__cursor" style={{left: cursorPos.x}} />
    </div>
  )
}

export default ColorSpectrum
