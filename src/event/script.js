window.E = (tagName = 'div', options) => $(document.createElement(tagName, options))

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function getWeekOfMonth(date) {
  var firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1
  if (firstWeekday < 0) firstWeekday = 6
  var offsetDate = date.getDate() + firstWeekday - 1
  return Math.floor(offsetDate / 7)
}

function occursOn(event, date) {
  if (event.midnight <= date && date < (event.ends ?? Infinity)) {
    switch (event.recurs) {
      case 'd': // Daily
        return true
      case 'w': // Weekly
        return event.date.getDay() === date.getDay()
      case 'm': // Monthly
        return event.date.getDate() === date.getDate()
      case 'y': // Yearly
        return event.date.getDate() === date.getDate() && event.date.getMonth() === date.getMonth()
      case 'me': // Monthly from end
        return event.daysUntilEndOfMonth === getLastDayOfMonth(date).getDate() - date.getDate()
      case 'wm': // Week of month
        return event.date.getDay() === date.getDay() && event.weekOfMonth === getWeekOfMonth(date)
      case 'wme': // Week of month from end
        return event.date.getDay() === date.getDay() && event.weekOfMonth === getWeekOfMonth(getLastDayOfMonth(date)) - getWeekOfMonth(date)
    }
  } else {
    return false
  }
}

const events = await fetch('/assets/events.json').then(e => e.json())
const params = new URL(location.href).searchParams
const event = events[params.get('id')]
if (typeof event === 'undefined') {
  location.href = new URL('/events', location.origin)
}
event.date = new Date(event.date * 1000)
if ('ends' in event) {
  event.ends = new Date(event.ends * 1000)
}
if ('recurs' in event) {
  event.midnight = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate())
  switch (event.recurs) {
    case 'me':
      event.daysUntilEndOfMonth = getLastDayOfMonth(event.date).getDate() - event.date.getDate()
      break
    case 'wm':
      event.weekOfMonth = getWeekOfMonth(event.date)
      break
    case 'wme':
      event.weekOfMonth = getWeekOfMonth(getLastDayOfMonth(event.date)) - getWeekOfMonth(event.date)
      break
  }
}
const date = params.has('d') ? new Date(parseInt(params.get('d')) * 1000) : event.date
if ('recurs' in event && (!occursOn(event, date) || event.date.getHours() !== date.getHours() || event.date.getMinutes() !== date.getMinutes())) {
  location.href = new URL('/events', location.origin)
}

$('#header').css('background-image', `linear-gradient(to top, var(--base-color), transparent 100px), url('/assets/events/${event.image}.webp')`)
$('#title').text(event.name)
$('#description').html(event.desc ?? '')
$('#date').empty().append(
  E('div').text(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(event.date)),
  E('div').text(new Intl.DateTimeFormat('en-GB', { timeStyle: 'short', hour12: true }).format(event.date))
)
$('#location').attr('src', event.location)
