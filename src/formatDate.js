'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newFormat = [];
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const numbers = date.split(separatorFrom);
  let [year, month, day] = numbers;

  for (let i = 0; i < numbers.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = numbers[i];
    }

    if (fromFormat[i] === 'MM') {
      month = numbers[i];
    }

    if (fromFormat[i] === 'DD') {
      day = numbers[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year.length === 2) {
        if (parseInt(year) >= 30) {
          year = '19' + year;
        } else {
          year = '20' + year;
        }
      }
      newFormat.push(year);
    }

    if (toFormat[i] === 'YY') {
      if (year.length === 4) {
        year = year.slice(-2);
      }
      newFormat.push(year);
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(month);
    }

    if (toFormat[i] === 'DD') {
      newFormat.push(day);
    }
  }

  return newFormat.join(separatorTo);
}

module.exports = formatDate;
