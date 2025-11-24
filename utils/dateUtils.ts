
const getDayWithSuffix = (day: number, locale: string): string => {
  if (locale !== 'en-US') {
    return `${day}`;
  }
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
};

export const getTodaysDateFormatted = (locale: 'en-US' | 'ru-RU'): string => {
  const today = new Date();
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(today);
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(today);
  const year = today.getFullYear();
  
  if (locale === 'ru-RU') {
      const day = today.getDate();
      return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} ${month}, ${year}`;
  }

  const dayWithSuffix = getDayWithSuffix(today.getDate(), locale);
  return `${weekday}, ${month} ${dayWithSuffix}, ${year}`;
};

export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0); // Normalize comparison date
  return compareDate > today;
};
