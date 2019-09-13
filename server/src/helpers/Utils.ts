const Utils = {
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r: number =  Math.random() * 16 | 0;
      const v: number  = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
};

const findById = ( array: any[], id: number | string) => array.filter( (item) => id === item.id)[0];
const findByIdWithIndex = ( array: any[], id: number | string) => {
  const found: {item: any, index: number} = {item: -1, index: -1};

  for (let i: number = 0; i < array.length; i++) {
    if (array[i] === id) {
      found.item = array[i];
      found.index = i;
    }
  }

  return found;
};

export const addLog = (type: string, message: string, params: any) => {
  let color = '';
  switch (type) {
    case 'on':
      color = '\x1b[35m';
      break;
    case 'emit':
      color = '\x1b[36m';
      break;
    case 'func':
      color = '\x1b[33m';
      break;
    default:
      color = '';
      break;
  }

  console.log(`${color} [ ${type.toUpperCase()} ] [ ${message} ] ${params}`);
};

export const getRandom = (min: number, max: number ) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const colorList = ['#FB9BD5', '#FFA88C', '#FFE68C', '#E1F885', '#9DEFD2', '#AF93FF', '#9DD2EF', '#FF6F6F'];
const colorListLength = colorList.length;

export const getColor = () => {
  const random: number = getRandom(0, colorListLength);
  return colorList[random];
};

export default Utils;
