import React, { FunctionComponent } from 'react'

import './_badge-number.styl'

type Props = {
  number: Number,
  extraClasses?: string
}

const BadgeNumber: FunctionComponent<Props> = ({number, extraClasses}) => {

  return (
    <span className={`badge badge--number ${extraClasses}`}><span className="badge__text">{number}</span></span>
  )
}


export default BadgeNumber
