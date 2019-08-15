import React, { FunctionComponent, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { State, Pen } from '../../../store/types';

import { ActionTypes } from '../../../store/actionTypes';

import './_toolbox-pen.styl';
import Icon from '../../UI/icons/Icon';
import ToolBox from '../ToolBox/ToolBox';

const PenToolbox: FunctionComponent = () => {
  const activePen = useSelector<State, Pen>(state => state.draw.pen);
  const dispatch = useDispatch();

  const pens = [ 'xs' ,'sm', 'md', 'lg'];

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
    <ToolBox type="pen">
      <Icon name="pencil" width={24} height={24} fill="#3514FF"></Icon>
      <div className="toolbox__body">
        {pens.map(item => {
          return (
            <button className={`toolbox__button toolbox__button--${item} ${activePen.index === item ? 'is-active' : ''}`} onClick={onClickBtnPen} data-index={item} key={`toolbox--pen-${item}`}>
              <span className={`toolbox__button__inner`}></span>
            </button>
          )
        })}
      </div>
    </ToolBox>
  )
}

export default PenToolbox;
