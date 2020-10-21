export default function ne2enNumbers(e = '') {
  let a = {
    '०': '0',
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
  }
  return e.toString().replace(/[०१२३४५६७८९]/g, function (e) {
    return a[e]
  })
}
