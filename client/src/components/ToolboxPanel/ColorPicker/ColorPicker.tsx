import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import ColorGradient from './ColorGradient/ColorGradient'
import ColorSpectrum from './ColorSpectrum/ColorSpectrum'
import ColorSwatches from './ColorSwatches/ColorSwatches'

import { hexToRgb, rgbToHsl, hslToRGB, rgbToString, rgbToHsv } from '../../../helpers/utils'
import { ColorState } from '../../../@types'

import './_color-picker.styl'

type Props = {
  color: string,
  onColorClb: (color: string) => void,
  onCloseClb: () => void
  isOpen: boolean
}

const ColorPicker: FunctionComponent<Props> = ({ color, onColorClb, onCloseClb, isOpen}) => {

  const colorPickerRef = useRef<HTMLDivElement>(null)
  const [saturated, setSaturated] = useState<{h: number, s: number, l: number}>({ h: 0, s: 100, l: 50 })
  const [currentColor, setCurrentColor] = useState<ColorState>({
    hex: color,
    rgb: {r: 0, g: 0, b: 0},
    hsl: { h: 0, s: 100, l: 50 },
    hsv: {h: 0, s: 0, v: 0}
  })

  const onChildColorClb = (color: string) => {
    onColorClb(color)
  }

  const onChildSaturatedClb = (saturated: { h: number, s:number, l: number }) => {
    const { h, s, l } = { ...currentColor.hsl, h: saturated.h }
    const { r, g, b } = hslToRGB(h, s, l)

    onColorClb(rgbToString(r,g,b))
  }

  const setColor = () => {
    const { r, g, b } = hexToRgb(color)
    const { h, s, l } = rgbToHsl(r, g, b)

    setCurrentColor({
      hex: color,
      rgb: { r, g, b },
      hsl: { h, s, l },
      hsv: rgbToHsv(r, g, b)
    })

    setSaturated({...saturated, h})
  }

  const setColorPickerLeft = () => {
    if (colorPickerRef && colorPickerRef.current) {
      const root = document.documentElement
      root.style.setProperty('--colorPickerLeft', `-${colorPickerRef.current.getBoundingClientRect().left}px`)
    }
  }

  const onResize = () => {
    setColorPickerLeft()
  }

  useEffect(() => {
    setColor()
  }, [color])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    setColor()
    return ( () => {
      window.addEventListener('resize', onResize)
    })
  }, [])

  useEffect(() => {
    setColorPickerLeft()
  }, [colorPickerRef.current])

  return(
    <div className={`color--picker ${isOpen ? 'is-open' : ''} `} ref={colorPickerRef}>
      <div className={`color__overlay`} onClick={onCloseClb} />
      <div className="color__inner">
        <ColorGradient color={currentColor} saturated={saturated} onColorClb={onChildColorClb} isOpen={isOpen} />
        <ColorSpectrum saturated={saturated} onSaturatedClb={onChildSaturatedClb} isOpen={isOpen} />
        <ColorSwatches color={currentColor.rgb} mustSwatchColor={!isOpen} onClickColorClb={onChildColorClb} />
      </div>
    </div>
  )
}

export default ColorPicker
