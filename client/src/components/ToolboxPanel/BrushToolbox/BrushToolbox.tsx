import React, { FunctionComponent, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { State, Brush } from '../../../store/types'

import { ActionTypes } from '../../../store/actionTypes'

import Icon from '../../UI/icons/Icon'
import ToolBox from '../ToolBox/ToolBox'

import './_toolbox-brush.styl'

const BrushToolbox: FunctionComponent = () => {
  const activeBrush = useSelector<State, Brush>(state => state.draw.brush)
  const dispatch = useDispatch()

  const brushes = [ 'xs' ,'sm', 'md', 'lg']

  const onClickBtnBrush = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentItem = e.currentTarget.getAttribute('data-index')
    if (currentItem) {
      dispatchBrushAction(currentItem)
    }
  }

  const dispatchBrushAction = (brush: String) => {
    dispatch({type: ActionTypes.SetBrush, payload: brush})
  }

  useEffect(() => {
    dispatchBrushAction(brushes[0])
  }, [])

  return(
    <ToolBox type="brush">
      <Icon name="pencil" width={24} height={24} fill="#3514FF"></Icon>
      <div className="toolbox__body">
        {brushes.map(item => {
          return (
            <button className={`toolbox__button toolbox__button--${item} ${activeBrush.index === item ? 'is-active' : ''}`} onClick={onClickBtnBrush} data-index={item} key={`toolbox--brush-${item}`}>
              <span className={`toolbox__button__inner`}></span>
            </button>
          )
        })}
      </div>
    </ToolBox>
  )
}

export default BrushToolbox
