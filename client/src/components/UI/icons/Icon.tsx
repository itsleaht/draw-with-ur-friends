import React, { FunctionComponent } from "react";

type Props = {
  name: string,
  extraClasses?: string | null,
  width: number,
  height: number,
  fill?: string | null,
  stroke?: string | null
}

const Icon: FunctionComponent<Props> = ({name, extraClasses, width, height, fill, stroke}) => {

  return(
    <svg className={`icon icon--${name} ${extraClasses ? extraClasses : ''} `} width={width} height={height}>
      <use xlinkHref={`#icon-${name}`} fill={fill ? fill : ''} stroke={stroke ? stroke : ''}></use>
    </svg>
  );

}

export default Icon;
