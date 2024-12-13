import { Months } from '../../../shared/consts/month';

export function getDateToComment(date: string) {
  const dateData = new Date(date);
  const getMonth = dateData.getMonth();
  const month: (monthNumber: number) => string = (
    monthNumber: number
  ): string => Months[monthNumber];
  const year = dateData.getFullYear();
  const dateToComment = `${month(getMonth)} ${year}`;

  return dateToComment;
}
