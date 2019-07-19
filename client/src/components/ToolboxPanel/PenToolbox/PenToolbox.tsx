import React, { FunctionComponent, useState, useEffect } from "react";

import './_toolbox-pen.styl';
import { useSelector, useDispatch } from "react-redux";
import { State, Pen } from "../../../store/types";
import { SET_PEN } from "../../../store/actionTypes";

const PenToolbox: FunctionComponent = () => {
  const activePen = useSelector<State, Pen>(state => state.draw.pen);
  const dispatch = useDispatch();

  const pens = ['sm', 'md', 'lg'];

  const onClickBtnPen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentItem = e.currentTarget.getAttribute('data-index');
    if (currentItem) {
      dispatchPenAction(currentItem);
    }
  }

  const dispatchPenAction = (pen: String) => {
    dispatch({type: SET_PEN, payload: pen});
  }

  useEffect(() => {
    dispatchPenAction(pens[0]);
  }, []);

  return(
    <div className="toolbox toolbox--pen">
      <span>Pinceau</span>
      {pens.map(item => {
        return (
          <button className={`toolbox__button toolbox__button--${item} ${activePen.index === item ? 'is-active' : ''}`} onClick={onClickBtnPen} data-index={item} key={`toolbox--pen-${item}`}></button>
        )
      })}
    </div>
  )
}

export default PenToolbox;
