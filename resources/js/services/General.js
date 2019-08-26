import * as moment from 'moment';

export function timeFromNow(timeString, format='YYYY-MM-DD HH:mm:ss') {
    const date = new Date(timeString);
    const offset = moment(date, format).utcOffset();
    return moment(date, format).add(offset, 'minutes').fromNow();
}