import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const formatPublishedAt = (publishedAt: string) => {
  return dayjs(publishedAt).fromNow(true);
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

export const formatViewCount =(viewCount:string) => {
  const num = parseInt(viewCount, 10);

  if (num < 1000) return `${num}`;
  if (num < 10000) return `${(num / 1000).toFixed(1)}천`;
  if (num < 100000000) return `${Math.floor(num / 10000)}만`;

  return `${(num / 100000000).toFixed(1)}억`;
}