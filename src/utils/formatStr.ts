function formatStr(str: string): string {
  return str
    .split('-')
    .map(item => item.slice(0,1).toUpperCase() + item.slice(1))
    .join(' ');
}

export default formatStr;