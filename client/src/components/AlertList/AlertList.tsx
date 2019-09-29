import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import appSelector from '../../store/selectors/appSelector'
import { State, Alert } from '../../store/types'

import './_list-alert.styl'
const AlertList: FunctionComponent = () => {
  const alerts = useSelector<State, Alert[]>(state => appSelector.alerts(state))

  const renderAlert = (type: string) => {
    switch (type) {
      case 'clear':
        return '♻️'
      case 'join':
        return '🎉'
      case 'leave':
        return '👈'
    }
  }

  return (
    <div className="alert list--alert">
     { alerts.map((alert,index) =>
      (
        <div className="alert__item" key={`alert-${index}`}>
          <span className="alert__type"><span className="alert__icon">{renderAlert(alert.type)}</span></span>
          <span className="alert__text" dangerouslySetInnerHTML={{__html: alert.content}} />
        </div>
      )
     )}

    </div>
  )
}

export default AlertList
