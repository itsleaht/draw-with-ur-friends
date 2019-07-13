import React, { FunctionComponent } from 'react';

import './_btn.styl';
import Icon from '../icons/Icon';

type Props = {
  className: string,
  text?: string,
  icon?: {
    name: string,
    extraClasses?: string,
    fill?: string,
    stroke?: string,
    width: number,
    height: number
  },
  onClickClb?: () => void
}

const Btn: FunctionComponent<Props> = ({text, icon, className, onClickClb = () => {}}) => {

  return(
    <button className={className} onClick={onClickClb}>
      {text ? text : <Icon name={icon!.name} extraClasses={icon!.extraClasses} fill={icon!.fill} stroke={icon!.stroke} width={icon!.width} height={icon!.height}></Icon>}
    </button>
  );

}

export default Btn;
