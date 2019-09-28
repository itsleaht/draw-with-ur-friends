import React, { FunctionComponent } from 'react'
import BrushToolbox from './BrushToolbox/BrushToolbox'
import ColorToolbox from './ColorToolbox/ColorToolbox'
import ClearToolbox from './ClearToolbox/ClearToolbox'

import './_panel-toolbox.styl'

const ToolboxPanel: FunctionComponent = () => {

  return (
    <div className="panel panel--toolbox">
      <BrushToolbox />
      <ColorToolbox />
      <ClearToolbox />
    </div>
  )
}

export default ToolboxPanel
