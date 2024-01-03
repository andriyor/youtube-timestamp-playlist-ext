import { intervalToDuration } from 'date-fns/intervalToDuration';

const zeroPad = (num: string) => num.padStart(2, '0');

export const formatSeconds = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  return [duration.hours, duration.minutes, duration.seconds]
    .map((value) => (value ? String(value) : '00'))
    .map(zeroPad)
    .join(':');
};

export const parseTimeStampToSeconds = (timestamp: string) => {
  const [hoursString, minutesString, secondsString] = timestamp.split(':');
  const secondsInHours = Number(hoursString) * 60 * 60;
  const secondsInMinutes = Number(minutesString) * 60;
  const seconds = Number(secondsString);
  return secondsInHours + secondsInMinutes + seconds;
};
