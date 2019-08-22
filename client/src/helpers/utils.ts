export const addLog = (type: string, message: string, params?: any) => {
  const logs = getLog(type, message, params)
  return console.log(logs.key, logs.value  ? logs.value : '' );
};

export const getLog = (type: string, message: string, params?: any): {key: string, value: any} => {
  let color = '';
  switch (type) {
    case 'on':
      color = '\x1b[35m';
      break;
    case 'emit':
      color = '\x1b[36m';
      break;
    case 'func':
      color = '\x1b[34m';
      break;
    default:
      color = '';
      break;
  }

  return {
    key: `${color} [ ${type.toUpperCase()} ] [ ${message} ]`,
    value: params
  }
};

const sliceInt = -2
const str = 16

export const convertToHex = (match: string) => {
  return (`0${(parseInt(match,10).toString(str))}`).slice(sliceInt);
}

export const rgbToHex = (rgb: string) => {
  const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
      return `#${convertToHex(rgbMatch[1])}${convertToHex(rgbMatch[2])}${convertToHex(rgbMatch[3])}`;
  }
}

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  //Calculate hue
  if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l }
}

export const rgbToHslString = (r: number, g: number, b: number) => {
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${h},${s}%,${l}%)`;
}

const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
export const hexToRgb = (hex: string) => {
    hex = hex.replace(shorthandHexRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {r: null, g: null, b: null};
}

export const hexToRGBString = (hex: string) => {
  const { r, g , b } = hexToRgb(hex)

  return `rgb(${r},${g},${b})`

}

