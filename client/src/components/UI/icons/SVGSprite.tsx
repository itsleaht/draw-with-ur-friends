import React, { FunctionComponent } from "react";

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

      </defs>
    </svg>
  );

}

export default SVGSprite;
