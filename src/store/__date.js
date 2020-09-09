/** Patterns */
const defaultKey = 'month';
const patterns = {
  default: defaultKey,
  selected: defaultKey,
  item: defaultKey,
  items: {
    today: 'Сегодня',
    yesterday: 'Вчера',
    week: 'Последние 7 дней',
    month: 'Последние 30 дней',
    custom: 'Выбранный период',
  },
  range: {
    today: 0,
    yesterday: 1,
    week: 7,
    month: 30,
    custom: 100,
  },
};

/** Return name months array */
const nameMonth = () => {
  return 'Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь'.split(',');
};

/** Format date */
const dateFormat = (range) => {
  const d = new Date();

  d.setDate(d.getDate() - range);

  let month = d.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  let day = d.getDate();
  day = day < 10 ? '0' + day : day;

  return d.getFullYear() + '-' + month + '-' + day;
};

/** Return dates array from pattern period */
const datesArray = (item, content) => {
  if (item === 'custom') {
    return content;
  }

  const filterDates = [];
  const dateFirst = dateFormat(patterns.range[item]);
  filterDates.push(dateFirst);

  if (patterns.range[item] > 1) {
    const today = dateFormat(0);
    filterDates.push(today);
  }

  return filterDates;
};

export {
  dateFormat,
  nameMonth,
  datesArray,
  patterns
};
