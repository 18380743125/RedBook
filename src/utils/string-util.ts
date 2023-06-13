export function formatPhone(text: string, preText: string) {
  let trim = text.replace(/\s+/g, '');
  const result = [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)].filter(Boolean).join(' ');
  if ((trim.length === 3 || trim.length === 7) && text.length > preText.length) {
    return result + ' ';
  } else {
    return result;
  }
}

export function replaceBlank(str: string) {
  return str ? str.replace(/\s+/g, '') : '';
}
