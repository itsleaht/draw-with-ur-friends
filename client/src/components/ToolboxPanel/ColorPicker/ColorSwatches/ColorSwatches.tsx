import React, { FunctionComponent, useEffect, useState } from 'react'
import { rgbToString } from '../../../../helpers/utils'

import './_color-swatches.styl'

type Props = {
  color: {r: number, g: number, b: number},
  mustSwatchColor: Boolean
}

const ColorSwatches: FunctionComponent<Props> = ({color, mustSwatchColor}) => {

  const nbSwatches = 14
  const [swatches, setSwatches] = useState(() => {
    const swatchList = []
    for (let i = 0; i < nbSwatches; i++) {
      swatchList.push({
        rgb: {r: 255, g: 255, b: 255},
        isActive: false
      })
    }
    return swatchList
  })
  const [areSwatchesActive, setAreSwatchesActive] = useState<boolean>(false)

  const swatchColor = () => {
    const formerSwatches = swatches
    let swatchIndex = nbSwatches - 1
    if (areSwatchesActive) {
      const indexOfColor = checkColorUnicity(color)
      if (indexOfColor <= 0 ) {
        swatchIndex = indexOfColor
      }
      // Check if color already exists in list
      swatches.forEach((swatch, index) => {
        if (swatch.rgb === color) {
          swatchIndex = index
        }
      })

      formerSwatches.splice(swatchIndex, 1)
      formerSwatches.unshift({
        rgb: color,
        isActive: true
      })
    } else {
      const indexOfColor = checkColorUnicity(color)
      if (indexOfColor >= 0 ) {
        swatchIndex = indexOfColor
      }

      formerSwatches.splice(swatchIndex, 1)
      formerSwatches.unshift({
        rgb: color,
        isActive: true
      })

      const nbActive = formerSwatches.filter((swatch) => swatch.isActive)
      if (nbActive.length === nbSwatches) {
        setAreSwatchesActive(true)
      }
    }
    setSwatches(formerSwatches)
  }

  const checkColorUnicity = (color: {r: number, g: number, b: number}) => {
    let index = -1
    swatches.forEach((swatch, i) => {
      if (swatch.rgb === color) {
        index = i
      }
    })
    return index
  }

  useEffect(() => {
    if (color && mustSwatchColor) {
      swatchColor()
    }
  }, [color, mustSwatchColor])

  return (
    <div className="color--swatches">
      <ul className="list--swatches">
        {
          swatches.map((swatch, index) => {
            return (
              <li className="list__item" key={`color-swatch-${index}`}>
                <button className="list__swatch" style={{background: `${rgbToString(swatch.rgb.r, swatch.rgb.g, swatch.rgb.b)}`}} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default ColorSwatches
