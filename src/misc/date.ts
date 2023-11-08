const isToday = (toFormatDate: Date, nowDate: Date) => toFormatDate.toDateString() === nowDate.toDateString();

const isCurrentYear = (toFormatDate: Date, nowDate: Date) => toFormatDate.getFullYear() === nowDate.getFullYear();

export const formatDate = (date: number) => {
  const toFormatDate = new Date(date);
  const nowDate = new Date();

  if (isToday(toFormatDate, nowDate))
    return toFormatDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isCurrentYear(toFormatDate, nowDate))
    return toFormatDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });

  return toFormatDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
};