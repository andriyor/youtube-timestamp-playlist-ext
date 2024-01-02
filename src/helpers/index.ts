import { format } from 'date-fns/format';

export const formatSeconds = (seconds: number) => {
  return format(Math.round(seconds) * 1000, 'mm:ss');
};
