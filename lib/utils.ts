export function formatTime(time: Date | string): string {
  const date = time instanceof Date ? time : new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
}

export function formatDate(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);

  return date.toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
