var TIME_ZONE_OFFSET = ' 00:00:00 GMT+545'
var BS_MONTHS = [
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
]

function isLeap(year) {
  return year % 100 === 0 ? (year % 400 === 0 ? true : false) : year % 4 === 0 ? true : false
}
function isValid(year, month, date) {
  return year >= 2000 && year <= 2029 && month >= 1 && month <= 12 && date <= getEnMonths(year)[month - 1] && date >= 1
    ? true
    : false
}

function getEnMonths(Y) {
  return isLeap(Y) ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

function countDays(from, to) {
  return Math.floor((from - to) / 86400000)
}

function Core(i, Arr, D) {
  for (var M = i; M < 12; M++) {
    if (D <= Arr[M]) {
      break
    } else {
      D -= Arr[M]
    }
  }
  return ['', M + 1, D]
}

function getTimestamp(year, month, date) {
  return new Date(year + '/' + month * 1 + '/' + date + TIME_ZONE_OFFSET).getTime()
}

export default function getBS(year, month, date) {
  let result
  const monthIndexes = [isLeap(year) ? 13 : 14, year === (2020 || 2024) ? 16 : 17]
  const y = year.toString().split('')[1] * 1
  if (isValid(year, month, date)) {
    if (month < 4 || (month === 4 && date < monthIndexes[0])) {
      result = Core(8, BS_MONTHS[y * 1], countDays(getTimestamp(year, month, date), getTimestamp(year, 1, 1)) + monthIndexes[1])
      result[0] = year + 56
    } else {
      result = Core(0, BS_MONTHS[y + 1], countDays(getTimestamp(year, month, date), getTimestamp(year, 4, monthIndexes[0])) + 1)
      result[0] = year + 57
    }
  }

  return result ? { year: result[0], month: result[1], date: result[2] } : {}
}
