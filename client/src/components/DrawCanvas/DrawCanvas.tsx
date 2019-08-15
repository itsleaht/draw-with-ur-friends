import React, { FunctionComponent } from 'react';

import './_draw-canvas.styl';

const DrawCanvas: FunctionComponent = () => {
  return (
    <div className="draw--canvas">
      <div className="draw__inner">
        <canvas className="canvas"></canvas>
      </div>
    </div>
  );
}

export default DrawCanvas;
