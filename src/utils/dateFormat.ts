export const dateFormat = (date: number) => {
  const data = new Date(date);
  const day = data.toLocaleDateString("pt-BR");
  const hour = data.toLocaleTimeString("pt-BR");

  return `${day} às ${hour}`;
};
