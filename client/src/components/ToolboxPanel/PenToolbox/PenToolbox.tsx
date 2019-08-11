import React, { FunctionComponent, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { State, Pen } from '../../../store/types';

import { ActionTypes } from '../../../store/actionTypes';

import './_toolbox-pen.styl';

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
    dispatch({type: ActionTypes.SetPen, payload: pen});
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
