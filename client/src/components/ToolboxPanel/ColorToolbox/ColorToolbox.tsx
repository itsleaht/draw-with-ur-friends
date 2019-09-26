import React, { FunctionComponent, useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import Icon from '../../UI/icons/Icon'
import ToolBox from '../ToolBox/ToolBox'
import ColorPicker from '../ColorPicker/ColorPicker'

import { rgbToHex, isHexa } from '../../../helpers/utils'

import './_toolbox-color.styl'
import { ActionTypes } from '../../../store/actionTypes'

const ColorToolbox: FunctionComponent = () => {

  const [color, setColor] = useState<string>('#FF4116')
  const [defaultColor, setDefaultColor] = useState<string>(color)
  const [colorInput, setColorInput] = useState<string>(color)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

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

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.keyCode === 13) {
      checkHexa()
    }
  }

  const handleColorPickerOpening = () => {
    if (isColorPickerOpen) {
      storeColor()
      setIsColorPickerOpen(false)
      dispatch({type: ActionTypes.SetCanDraw, payload: true})
    } else {
      setIsColorPickerOpen(true)
      dispatch({type: ActionTypes.SetCanDraw, payload: false})
    }
  }

  const onClickColorButton = () => {
    handleColorPickerOpening()
  }

  const storeColor = () => {
    dispatch({type: ActionTypes.SetColor, payload: color })
  }

  useEffect(() => {
    storeColor()
  }, [])

  return(
    <ToolBox type="color">
      <span className="toolbox__title tag">Color</span>
      <div className="toolbox__body">
        <button className="toolbox__color" style={{backgroundColor: `${color}`}} onClick={onClickColorButton}></button>
        <input type="text" value={colorInput} className="toolbox__hexa" onChange={onChangeInputColor} onKeyPress={onKeyPress} onBlur={onBlurInputColor} />
      </div>
      <ColorPicker color={color} onColorClb={onColorClb} isOpen={isColorPickerOpen} onCloseClb={handleColorPickerOpening} />
    </ToolBox>
  )
}

export default ColorToolbox
