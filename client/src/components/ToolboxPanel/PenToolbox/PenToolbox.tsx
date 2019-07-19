import React, { FunctionComponent, useState } from "react";

import './_toolbox-pen.styl';

const PenToolbox: FunctionComponent = () => {
  const [activePen, setActivePen] = useState<string>('sm');
  const sizes = ['sm', 'md', 'lg'];

  const onClickBtnPen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentItem = e.currentTarget.getAttribute('data-index');
    if (currentItem) {
      setActivePen(currentItem);
    }
  }

  return(
    <div className="toolbox toolbox--pen">
      <span>Pinceau</span>
      {sizes.map(item => {
        return (
          <button className={`toolbox__button toolbox__button--${item} ${activePen === item ? 'is-active' : ''}`} onClick={onClickBtnPen} data-index={item} key={`toolbox--pen-${item}`}></button>
        )
      })}
    </div>
  )
}

export default PenToolbox;
