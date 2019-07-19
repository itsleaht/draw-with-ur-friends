import React, { FunctionComponent, useState } from "react";

import './_toolbox-pen.styl';
import { useSelector, useDispatch } from "react-redux";
import { State, Pen } from "../../../store/types";
import { setPen } from "../../../store/actions";

const PenToolbox: FunctionComponent = () => {
  const activePen = useSelector<State, Pen>(state => state.draw.pen);
  const dispatch = useDispatch();

  const sizes = ['sm', 'md', 'lg'];

  const onClickBtnPen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentItem = e.currentTarget.getAttribute('data-index');
    if (currentItem) {
      dispatch({type: setPen, payload: currentItem});
    }
  }

  return(
    <div className="toolbox toolbox--pen">
      <span>Pinceau</span>
      {sizes.map(item => {
        return (
          <button className={`toolbox__button toolbox__button--${item} ${activePen.index === item ? 'is-active' : ''}`} onClick={onClickBtnPen} data-index={item} key={`toolbox--pen-${item}`}></button>
        )
      })}
    </div>
  )
}

export default PenToolbox;
