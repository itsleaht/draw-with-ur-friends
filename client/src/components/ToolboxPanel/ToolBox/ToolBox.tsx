import React, { FunctionComponent } from 'react'

import './_toolbox.styl'

type Props = {
  type: string
}


const ToolBox: FunctionComponent<Props> = ({children, type}) => {
  return(
    <div className={`toolbox toolbox--${type}`}>
      <div className="toolbox__inner">
        { children }
      </div>
    </div>
  )
}

export default ToolBox
