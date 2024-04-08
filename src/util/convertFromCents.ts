export const convertFromCents = (centAmount: number | string) => {
  return Number(centAmount) / 100 || 0
}
