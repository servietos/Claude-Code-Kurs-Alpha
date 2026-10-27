export function formatPrice(cents) {
  var euros = Math.floor(cents / 100);
  var rest = cents % 100;
  if (rest < 10) rest = '0' + rest;
  return euros + ',' + rest + ' €';
}
