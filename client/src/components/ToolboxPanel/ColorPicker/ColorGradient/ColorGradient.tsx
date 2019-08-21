import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import './_color-gradient.styl';

type Props = {
  color?: string,
  onColorClb: (color: string) => void
}

const ColorGradient: FunctionComponent<Props> = ({ color, onColorClb}) => {
  const gradientRef = useRef<HTMLCanvasElement>(null)
  const gradientWrapperRef = useRef<HTMLDivElement>(null)
  const gradientRefSize = {
    width: gradientRef.current ? gradientRef.current.width : 0,
    height: gradientRef.current ? gradientRef.current.height : 0,
  }

  const [cursorPos, setCursorPos] = useState<{x: number, y: number}>({x: 0, y:0})
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [ctx, setCtx] = useState<any>(null)

  const createGradient = () => {
    if (gradientRef && gradientRef.current) {
      setCtx(gradientRef.current.getContext('2d'))

      if (ctx) {
        ctx.clearRect(0, 0, gradientRefSize.width, gradientRefSize.height);
        // console.log('create gradient', color)
        ctx.fillStyle = color ? color : '#cceebb';
        ctx.fillRect(0, 0, gradientRefSize.width, gradientRefSize.height);

        const whiteGradient = ctx.createLinearGradient(0, 0, gradientRefSize.width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, gradientRefSize.width, gradientRefSize.height);

        const blackGradient = ctx.createLinearGradient(0, 0, 0, gradientRefSize.height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, gradientRefSize.width, gradientRefSize.height);
      }
    }
  }

  const moveCursor = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gradientWrapperRef.current) {
      const x = Math.round(e.nativeEvent.offsetX);
      const y = Math.round(e.nativeEvent.offsetY);

      console.log(x,y, color)

      const value = 100 - (y * 100 / gradientRefSize.width) | 0;
      const saturation = x * 100 / gradientRefSize.width | 0;

      setCursorPos({x, y})

      const selectedColor = ctx.getImageData(cursorPos.x, cursorPos.y, 1, 1).data
      console.log('selected color', selectedColor)
      onColorClb(`rgb(${selectedColor[0]},${selectedColor[1]},${selectedColor[2]})`)
    }
  }

  const onMouseDown = () => {
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
  }

  const onMouseMoveGradient = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      moveCursor(e)
    }
  }

  useEffect(() => {
    if (gradientRef && gradientRef.current) {
      createGradient()
    }
  }, [gradientRef, gradientRefSize, ctx])

  return (
    <div className="color__wrapper--gradient" ref={gradientWrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMoveGradient}>
      <canvas className="color__gradient" ref={gradientRef} />
      <span className="color__cursor" style={{top: cursorPos.y, left: cursorPos.x}} />
    </div>
  )
}

export default ColorGradient
