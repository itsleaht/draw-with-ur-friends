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

export const isHexa = (color: string) => {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
}

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

  // console.log(r, g, b)

  const max = Math.max(r, g, b),
  min = Math.min(r, g, b);
  const md = (max + min) / 2
  let h = 0, s = 0;
  let l = md;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    if (h)
      h /= 6;
  }

  // console.log(h, s, l)

  return {
    h: Math.round((h! * 360)),
    s: Math.round(s! * 100),
    l: Math.round(l! * 100)
  }
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
    } : {r: 0, g: 0, b: 0};
}

export const hexToRGBString = (hex: string) => {
  const { r, g , b } = hexToRgb(hex)

  return `rgb(${r},${g},${b})`
}

export const hslToHex = (h: number, s: number, l: number) => {
  const { r, g, b } = hslToRGB(h, s, l)
  return rgbToHex(`${r},${g},${b}`)
}

export const hslToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return {r, g, b}
}

export const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h = 0, s = 0,
  v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

export const hslToString = (h: number, s: number, l: number) => {
  return `hsl(${h},${s}%,${l}%)`
}

export const rgbToString = (r: number, g: number, b: number) => {
  return `rgb(${r},${g},${b})`
}
