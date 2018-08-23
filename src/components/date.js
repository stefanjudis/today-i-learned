import React from 'react';

export default ({ dateString }) => {
  const [, year, month, day] = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
  const readableDateString = new Date(year, +month - 1, day).toDateString();

  return <time dateTime={dateString}>{readableDateString}</time>;
};
