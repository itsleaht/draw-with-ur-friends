import React, { FunctionComponent } from 'react';
import PenToolbox from './PenToolbox/PenToolbox';
import ColorToolbox from './ColorToolbox/ColorToolbox';

import './_panel-toolbox.styl';

const ToolboxPanel: FunctionComponent = () => {

  return (
    <div className="panel panel--toolbox">
      <PenToolbox />
      <ColorToolbox />
    </div>
  )
}

export default ToolboxPanel;
