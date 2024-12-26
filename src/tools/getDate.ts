import { DateTime } from 'luxon';
import { DATE_TIME_FORMAT } from '@/constants';

const getDate = (date: string): string => {
	return DateTime.fromJSDate(new Date(date)).toFormat(DATE_TIME_FORMAT);
};

export default getDate;
