import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class TimezoneService {
  setTimezone(timezone: string): void {
    moment.tz.setDefault(timezone);
  }
}
