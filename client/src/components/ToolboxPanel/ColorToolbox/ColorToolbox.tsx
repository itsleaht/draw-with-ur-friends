import React, { FunctionComponent, useEffect, useState } from 'react';

import Icon from '../../UI/icons/Icon';
import ToolBox from '../ToolBox/ToolBox';
import ColorPicker from '../ColorPicker/ColorPicker';

import { rgbToHex, isHexa } from '../../../helpers/utils';
import './_toolbox-color.styl';

const ColorToolbox: FunctionComponent = () => {
  const [color, setColor] = useState<string>('#FF4116');
  const [defaultColor, setDefaultColor] = useState<string>(color);
  const [colorInput, setColorInput] = useState<string>(color);

  const checkHexa = () => {
    const output = colorInput.indexOf('#') >= 0 ? colorInput : `#${colorInput}`

    if (!isHexa(output)) {
      setColor(defaultColor)
      setColorInput(defaultColor)
    } else {
      setDefaultColor(output)
      setColor(output)
    }
  }

  const onBlurInputColor = (e: React.FocusEvent<HTMLInputElement>) => {
    checkHexa()
  }

  const onChangeInputColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(e.target.value)
  }

  const onColorClb = (color: string) => {
    const hex = rgbToHex(color)
    setColor(hex ? hex : defaultColor)
    setColorInput(hex ? hex : defaultColor)
  }

  return(
    <ToolBox type="color">
      <Icon name="color" width={30} height={29} fill="#3514FF"></Icon>
      <div className="toolbox__body">
        <button className="toolbox__color" style={{backgroundColor: `${color}`}}></button>
        <input type="text" value={colorInput} className="toolbox__hexa" onChange={onChangeInputColor} onBlur={onBlurInputColor} />
      </div>
      <ColorPicker color={color} onColorClb={onColorClb} />
    </ToolBox>

  )
}

export default ColorToolbox
