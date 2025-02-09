export const formatDate = (date) => {
  return date ? date.toISOString().split('T')[0] : null;
};

export const formatLocation = (location) => {
  return typeof location == 'string'
    ? location.split('(')[0].trim()
    : location.title;
};

export const formatTime = (time) => {
  const [hour, minute] = time.split('T')[1].slice(0, 5).split(':');
  return `${hour}:${minute} ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`;
};

export const formatDuration = (durationInMinutes) => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours} hr ${minutes} min`;
};