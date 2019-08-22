import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import './_color-picker.styl';
import ColorGradient from './ColorGradient/ColorGradient';
import ColorSpectrum from './ColorSpectrum/ColorSpectrum';
import { hexToRgb, rgbToHsl, hslToRGB, rgbToString, rgbToHsv } from '../../../helpers/utils';
import { ColorState } from '../../../@types';

type Props = {
  color: string,
  onColorClb: (color: string) => void
}

const ColorPicker: FunctionComponent<Props> = ({ color, onColorClb}) => {

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

  useEffect(() => {
    setColor()
  }, [color])

  useEffect(() => {
    setColor()
  }, [])

  return(
    <div className="color--picker">
      <div className="color__inner">
        <ColorGradient color={currentColor} saturated={saturated} onColorClb={onChildColorClb} />
        <ColorSpectrum saturated={saturated} onSaturatedClb={onChildSaturatedClb} />
        <ul className="list--swatches">
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
          <li className="list__item"></li>
        </ul>
      </div>
    </div>
  )
}

export default ColorPicker
