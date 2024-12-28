import { DateTime } from 'luxon';

export const getDateTime = (date: Date): string => {
	return DateTime.fromJSDate(new Date(date)).toFormat('FF');
};
