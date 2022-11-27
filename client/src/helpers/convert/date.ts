import moment from 'moment';

export const formatDate = (
  date: string | number | Date,
  pattern = 'DD/MM/yyyy HH:mm'
) => {
  return moment(new Date(date)).format(pattern);
};
