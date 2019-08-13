import React, { FunctionComponent } from 'react';

import './_dot-number.styl';

type Props = {
  number: Number,
  extraClasses?: string
}

const DotNumber: FunctionComponent<Props> = ({number, extraClasses}) => {

  return (
    <span className={`dot dot--number ${extraClasses}`}><span className="dot__text">{number}</span></span>
  )
}


export default DotNumber;
