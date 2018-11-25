import Vue from 'vue'

const months = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12'
]

const dateFilter = value => {
  return formatDate(value)
}

function formatDate(inputDate) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const formattedDate =
    day +
    '/' +
    month +
    '/' +
    year +
    ' lúc ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  return formattedDate
}

Vue.filter('date', dateFilter)
