import React, { FunctionComponent, useEffect, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';

// import { State, Pen } from '../../../store/types';

// import { ActionTypes } from '../../../store/actionTypes';

import Icon from '../../UI/icons/Icon';
import ToolBox from '../ToolBox/ToolBox';

import './_toolbox-color.styl';

const ColorToolbox: FunctionComponent = () => {
  const [color, setColor] = useState<string>('#FF4117');

  return(
    <ToolBox type="color">
      <Icon name="color" width={30} height={29} fill="#3514FF"></Icon>
      <div className="toolbox__body">
        <button className="toolbox__color" style={{backgroundColor: `${color}`}}></button>
        <input type="text" value={color} className="toolbox__hexa" />
      </div>
    </ToolBox>
  )
}

export default ColorToolbox
