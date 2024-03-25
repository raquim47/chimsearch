import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const formatDateFromNow = (date: string) => {
  return dayjs(date).fromNow(true);
};

export const formatDateToShort = (date: string) => {
  const formatted = dayjs(date).format('YYYY. MM .DD');
  return formatted;
};

export const formatDuration = (duration: string) => {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!matches) return '00:00';
  const hours = matches[1]
    ? String(parseInt(matches[1], 10)).padStart(2, '0') + ':'
    : '';
  const minutes = matches[2]
    ? String(parseInt(matches[2], 10)).padStart(2, '0') + ':'
    : '00:';
  const seconds = matches[3]
    ? String(parseInt(matches[3], 10)).padStart(2, '0')
    : '00';
  return hours + minutes + seconds;
};

export const formatViewCount = (viewCount: string) => {
  const num = parseInt(viewCount, 10);

  if (num < 1000) return `${num}`;
  if (num < 10000) return `${(num / 1000).toFixed(1)}천`;
  if (num < 100000000) return `${Math.floor(num / 10000)}만`;

  return `${(num / 100000000).toFixed(1)}억`;
};

export const formatTextHighlight = (text: string, keyword: string) => {
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, `<strong>$1</strong>`);
};

export const formatTimeToSeconds = (time: string): number => {
  const parts = time.split(':').map(Number).reverse();
  let seconds = 0;

  for (let i = 0; i < parts.length; i++) {
    seconds += parts[i] * Math.pow(60, i);
  }

  return seconds;
};
