import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import './_color-picker.styl';
import ColorGradient from './ColorGradient/ColorGradient';
import ColorSpectrum from './ColorSpectrum/ColorSpectrum';

type Props = {
  color: string,
  onColorClb: (color: string) => void
}

const ColorPicker: FunctionComponent<Props> = ({ color, onColorClb}) => {

  const [saturated, setSaturated] = useState<{h: number, s: number, l: number}>({ h: 300, s: 100, l: 50 })

  const onChildColorClb = (color: string) => {
    console.log('on color child clb', color)
    onColorClb(color)
  }

  const onChildSaturatedClb = (saturated: { h: number, s:number, l: number }) => {
    setSaturated(saturated)
  }

  return(
    <div className="color--picker">
      <div className="color__inner">
        {/* <ColorGradient color={color} onColorClb={onChildColorClb} /> */}
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
