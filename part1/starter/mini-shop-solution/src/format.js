export function formatPrice(cents) {
  const euros = Math.floor(cents / 100);
  const rest = String(cents % 100).padStart(2, '0');
  return `${euros},${rest} €`;
}
