const now = new Date()
const HoursAgo = new Date(now.getTime())
HoursAgo.setHours(now.getHours() - 3)
const secondsAgo = new Date(now.getTime())
secondsAgo.setSeconds(now.getSeconds() - 5)
const minutesAgo = new Date(now.getTime())
minutesAgo.setMinutes(now.getMinutes() - 15)

var endpoint200 = {
  name: 'Name 200',
  code: 200,
  version: 1,
  timestamp: now
}

var endpoint206 = {
  name: 'Name 206',
  code: 206,
  version: 2,
  timestamp: now
}

var endpoint500 = {
  name: 'Name 500',
  code: 500,
  version: 1,
  timestamp: now
}

var endpointSecondsAgo = {
  name: 'Name seconds',
  code: 200,
  version: 1,
  timestamp: secondsAgo
}

var endpointMinutesAgo = {
  name: 'Name minutes',
  code: 200,
  version: 1,
  timestamp: minutesAgo
}

var endpointHoursAgo = {
  name: 'Name one Hour',
  code: 200,
  version: 2,
  timestamp: HoursAgo
}

var endpointv2 = {
  name: 'Name v2',
  code: 200,
  version: 2,
  timestamp: now
}

module.exports = {
  endpoint200: endpoint200,
  endpoint206: endpoint206,
  endpoint500: endpoint500,
  endpointSecondsAgo: endpointSecondsAgo,
  endpointMinutesAgo: endpointMinutesAgo,
  endpointHoursAgo: endpointHoursAgo,
  endpointv2: endpointv2,
  endpoints: [endpoint200, endpoint206, endpoint500, endpointSecondsAgo, endpointMinutesAgo, endpointHoursAgo, endpointv2]
}
