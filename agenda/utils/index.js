export const getFormattedDate = (arg) => {
  const date = new Date(arg);
  return `${format(date.getDate())} / ${format(date.getMonth() + 1)}`;
};

export const getFormattedFullDate = (arg) => {
  const date = new Date(arg);
  return `${format(date.getDate())} / ${format(
    date.getMonth() + 1
  )} / ${date.getFullYear()}`;
};

export const getFormattedTime = (arg) => {
  const date = new Date(arg);
  return `${format(date.getHours())} : ${format(date.getMinutes())}`;
};

const format = (num) => (num < 10 ? "0" + num : num);
