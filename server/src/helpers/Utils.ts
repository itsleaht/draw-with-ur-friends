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

export default Utils;
