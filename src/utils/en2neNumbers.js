export default function en2neNumbers(e = '') {
  let a = {
    0: '०',
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९',
  }
  return e.toString().replace(/[0123456789]/g, function (e) {
    return a[e]
  })
}
