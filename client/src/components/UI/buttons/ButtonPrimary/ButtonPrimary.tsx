import React, { FunctionComponent } from 'react'
import './_btn--primary.styl'

type Props = {
  text?: string,
  isBig?: boolean,
  isDisabled?: boolean,
  className: string,
  onClickClb?: () => void
}

const ButtonPrimary: FunctionComponent<Props> = ({text, className, isDisabled, isBig, onClickClb = () => {}}) => {
  return(
    <button className={`btn--primary ${isDisabled ? 'is-disabled' : ''} ${isBig ? 'btn--primary--big' : ''} ${className}`} onClick={onClickClb}>{text}</button>
  )

}

export default ButtonPrimary
