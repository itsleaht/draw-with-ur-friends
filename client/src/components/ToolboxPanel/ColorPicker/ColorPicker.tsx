import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';

// import { State, Pen } from '../../../store/types';

// import { ActionTypes } from '../../../store/actionTypes';

import { rgbToHex, hexToRgb } from '../../../helpers/utils';
import './_color-picker.styl';
import ColorGradient from './ColorGradient/ColorGradient';

type Props = {
  color: string,
  onColorClb: (color: string) => void
}

const ColorPicker: FunctionComponent<Props> = ({ color, onColorClb}) => {

  const spectrumRef = useRef<HTMLCanvasElement>(null)
  const gradientRef = useRef<HTMLCanvasElement>(null)
  const spectrumRefSize = {
    width: spectrumRef.current ? spectrumRef.current.width : 0,
    height: spectrumRef.current ? spectrumRef.current.height : 0,
  }

  const spectrum = [
    {offset: 0.00, color: "#ff0000"}, {offset: 0.17, color: "#ff00ff"},
    {offset: 0.33, color: "#0000ff"}, {offset: 0.50, color: "#00ffff"},
    {offset: 0.67, color: "#00ff00"}, {offset: 0.83, color: "#ffff00"},
    {offset: 1.00, color: "#ff0000"}
  ]

  const createSpectrum = () => {
    if (spectrumRef && spectrumRef.current) {
      const ctx = spectrumRef.current.getContext('2d');
      const hueGradient = ctx!.createLinearGradient(0, 0, spectrumRefSize.width, 0);

      spectrum.forEach(item => {
        hueGradient.addColorStop(item.offset, item.color);
      });

      ctx!.fillStyle = hueGradient;
      ctx!.fillRect(0, 0, spectrumRefSize.width, spectrumRefSize.height);
    }
  }

  const onColorChildClb = (color: string) => {
    console.log('on color child clb', color)
    onColorClb(color)
  }

  useEffect(() => {
    if (spectrumRef && spectrumRef.current) {
      createSpectrum()
    }
  }, [spectrumRef, spectrumRefSize])

  return(
    <div className="color--picker">
      <div className="color__inner">
        <ColorGradient color={color} onColorClb={onColorChildClb} />
        <canvas className="color__spectrum" ref={spectrumRef} />
        <ul className="list--colors">
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
