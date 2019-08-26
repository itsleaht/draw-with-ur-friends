import React, { FunctionComponent } from 'react'
import BrushToolbox from './BrushToolbox/BrushToolbox'
import ColorToolbox from './ColorToolbox/ColorToolbox'

import './_panel-toolbox.styl'

const ToolboxPanel: FunctionComponent = () => {

  return (
    <div className="panel panel--toolbox">
      <BrushToolbox />
      <ColorToolbox />
    </div>
  )
}

export default ToolboxPanel
