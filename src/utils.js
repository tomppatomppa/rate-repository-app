export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

export function parseDate(date) {
  const dateObject = new Date(date).toLocaleDateString('en-GB');
  return dateObject.replaceAll('/', '.').split('T')[0];
}
