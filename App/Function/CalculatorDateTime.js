export function agoTime(time1, time2) {
  var timestamp = Math.round((time1 - time2) / 1000)
  if (timestamp < 60) return timestamp + ' giây'
  else if (timestamp < 3600) return Math.round(timestamp / 60) + ' phút'
  else if (timestamp < 86400) return Math.round(timestamp / 3600) + ' giờ'
  else return Math.round(timestamp / 86400) + ' ngày'
}
//agoTime(new Date().getTime(), 1491288144500)
