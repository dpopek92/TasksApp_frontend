const initZero = (number: number) => {
  if (number < 10) return `0${number}`;
  return number;
};

export const formatDate = (date: Date) => {
  return `${initZero(date.getDate())}.${initZero(
    date.getMonth()
  )}.${date.getFullYear()}r, ${initZero(date.getHours())}:${initZero(
    date.getMinutes()
  )}`;
};
