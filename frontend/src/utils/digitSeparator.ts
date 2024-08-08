export const digitSeparator = (num: number) => {
  const numList = String(num)?.split('.') ?? [];
  numList[0] = numList[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  return numList.join('.');
};
