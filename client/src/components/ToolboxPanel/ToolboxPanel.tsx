import React, { FunctionComponent } from 'react'
import BrushToolbox from './BrushToolbox/BrushToolbox'
import ColorToolbox from './ColorToolbox/ColorToolbox'
import ClearToolbox from './ClearToolbox/ClearToolbox'
import SaveToolbox from './SaveToolbox/SaveToolbox'

import './_panel-toolbox.styl'

const ToolboxPanel: FunctionComponent = () => {

  return (
    <div className="panel panel--toolbox">
      <BrushToolbox />
      <ColorToolbox />
      <ClearToolbox />
      <SaveToolbox />
    </div>
  )
}

export default ToolboxPanel
