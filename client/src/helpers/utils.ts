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

const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
export const hexToRgb = (hex: string) => {
      hex = hex.replace(shorthandHexRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      console.log('in ', hex)
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }

