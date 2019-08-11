import React, { FunctionComponent } from 'react';

import './svg-sprite.styl';

const SVGSprite: FunctionComponent = () => {

  return(
    <svg className="svg-sprite">
      <defs>

      {/* <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter> */}

        <symbol id="icon-message-notification" viewBox="0 0 60 48">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10v15c0 5.523 4.477 10 10 10h17l25.5 12.5L42 35h8c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H10z"/>
        </symbol>

        <symbol id="icon-arrow-down" viewBox="0 0 21 12">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.935 10.296L.778 3.19a1.372 1.372 0 0 1 0-1.797 2.743 2.743 0 0 1 4.147 0l4.862 5.611c.394.455 1.032.455 1.426 0l4.862-5.61a2.743 2.743 0 0 1 4.147 0 1.372 1.372 0 0 1 0 1.796l-6.157 7.106c-1.969 2.272-5.16 2.272-7.13 0z" />
        </symbol>

        <symbol id="icon-plus" viewBox="0 0 19 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.5 19A1.5 1.5 0 0 1 8 17.5v-16a1.5 1.5 0 0 1 3 0v16A1.5 1.5 0 0 1 9.5 19z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 9.5A1.5 1.5 0 0 1 1.5 8h16a1.5 1.5 0 0 1 0 3h-16A1.5 1.5 0 0 1 0 9.5z"/>
        </symbol>

        <symbol id="icon-user" viewBox="0 0 20 19">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.156 17.796c.877-.073 1.75-.142 2.5-.142.715 0 1.487.032 2.256.063l.586.024c.972.038 1.93.063 2.833.021 1.54-.07 2.716-.332 3.484-.871-3.374-7.77-14.77-7.26-17.619.79.244.09.539.162.89.216.688.105 1.5.12 2.384.087.81-.03 1.645-.1 2.467-.17l.22-.018zM0 18.16c2.695-9.864 16.538-10.611 20-.99-1.62 1.817-5.048 1.675-8.14 1.547a54.73 54.73 0 0 0-2.205-.062c-.758 0-1.67.076-2.638.157-2.603.219-5.599.47-7.017-.652z" />
        </symbol>

      </defs>
    </svg>
  );

}

export default SVGSprite;
