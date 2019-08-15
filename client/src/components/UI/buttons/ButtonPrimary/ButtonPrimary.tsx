import React, { FunctionComponent } from 'react';
import './_btn--primary.styl';

type Props = {
  text?: string,
  className: string,
  onClickClb?: () => void
}

const ButtonPrimary: FunctionComponent<Props> = ({text, className, onClickClb = () => {}}) => {

  return(
    <button className={`btn--primary ${className}`} onClick={onClickClb}>{text}</button>
  );

}

export default ButtonPrimary;
