import * as moment from 'moment';

export class DateTimeService {
    convertToString(param: Date) {
        const formattedDate = moment(param).format('YYYY-MM-DD HH:mm:ss');
        return formattedDate
    }

    convertToDateTime(param: string) {
        const date = moment(param, 'YYYY-MM-DD HH:mm:ss').toDate();
        return date
    }
}