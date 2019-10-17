import React, { FunctionComponent, useState, useEffect } from 'react'

import ToolBox from '../ToolBox/ToolBox'
import Icon from '../../UI/icons/Icon'

import './_toolbox-save.styl'
const SaveToolbox: FunctionComponent = () => {

  const saveEvent = new CustomEvent('canvas:save')

  const onClickButton = () => {
    window.dispatchEvent(saveEvent)
  }

  return(
    <ToolBox type="save">
      <button className="toolbox__icon" onClick={onClickButton}>
        <Icon name="download" width={16} height={15} fill="#fff" />
      </button>
    </ToolBox>
  )
}

export default SaveToolbox
