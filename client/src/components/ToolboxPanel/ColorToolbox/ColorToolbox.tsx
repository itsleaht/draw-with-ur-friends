import React, { FunctionComponent, useEffect, useState } from 'react';

import Icon from '../../UI/icons/Icon';
import ToolBox from '../ToolBox/ToolBox';
import ColorPicker from '../ColorPicker/ColorPicker';

import { rgbToHex } from '../../../helpers/utils';
import './_toolbox-color.styl';

const ColorToolbox: FunctionComponent = () => {
  const defaultColor = '#FF4117';
  const [color, setColor] = useState<string>('#FF4117');

  const checkHexa = (color: string) => {
    const output = color.indexOf('#') >= 0 ? color : `#${color}`
    setColor(output)

    if (!isHexa(output)) {
      setColor(defaultColor)
    }
  }

  const isHexa = (color: string) => {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
  }

  const onBlurInputColor = (e: React.FocusEvent<HTMLInputElement>) => {
    checkHexa(color)
  }

  const onChangeInputColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const onColorClb = (color: string) => {
    const hex = rgbToHex(color)
    setColor(hex ? hex : defaultColor)
  }

  return(
    <ToolBox type="color">
      <Icon name="color" width={30} height={29} fill="#3514FF"></Icon>
      <div className="toolbox__body">
        <button className="toolbox__color" style={{backgroundColor: `${color}`}}></button>
        <input type="text" value={color} className="toolbox__hexa" onChange={onChangeInputColor} onBlur={onBlurInputColor} />
      </div>
      <ColorPicker color={color} onColorClb={onColorClb} />
    </ToolBox>

  )
}

export default ColorToolbox
