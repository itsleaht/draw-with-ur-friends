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
      color = '\x1b[34m';
      break;
    default:
      color = '';
      break;
  }

  console.log(`${color} [ ${type.toUpperCase()} ] [ ${message} ]`, params);
};
