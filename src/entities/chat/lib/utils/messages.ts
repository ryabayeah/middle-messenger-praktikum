export const getHourMinutes = (date: Date):string => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

export const getWeekDayName = (date: Date):string => {
    const day = date.getDay()
    const SHORT_WEEK_NAMES: Record<number, string> = {
        0: 'Пн',
        1: 'Вт',
        2: 'Ср',
        3: 'Чт',
        4: 'Пт',
        5: 'Сб',
        6: 'Вс',
    }
    return SHORT_WEEK_NAMES[day]
}

export const getMonthName = (date: Date):string => {
    const month = date.getMonth()
    const MONTHS_NAMES: Record<number, string> = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь',
    }
    return MONTHS_NAMES[month]
}

export const getDayMonth = (date: Date):string => {
    const day = date.getDate()
    return `${day} ${getMonthName(date)}`
}

export const isDatesEqual = (dateOne: Date, dateTwo: Date, includeTime?: boolean):boolean => {
    if (includeTime){
        return dateOne.getTime() === dateTwo.getTime()
    }
    const newOne = new Date(dateOne) 
    const newTwo = new Date(dateOne) 

    return newOne.setHours(0,0,0,0) === newTwo.setHours(0,0,0,0)
}

// Если сегодняшний день, то время (14: 54)
// Если в диапазоне трех дней, то день недели (Пт)
// Иначе дату (27 июля)
export const getMessageTime = (messageTime: string): string => {
  let lastMessageTime = '';
  const date = new Date(messageTime);
  const currentDate = new Date();
  if (isDatesEqual(date, currentDate)) {
    lastMessageTime = getHourMinutes(date);
  }
  return lastMessageTime;
};
