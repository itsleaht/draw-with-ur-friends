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

