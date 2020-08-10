import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/service/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendar: Array<any> = [];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment){
    let startDay = now.clone().startOf('month').startOf('week');
    let endDay = now.clone().endOf('month').endOf('week');
    let date = startDay.clone().subtract(1, 'day');
    let calendar: Array<any> = [];

    while (date.isBefore(endDay, 'day')) {

      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() =>{
            let value = date.add(1, "day").clone();
            let active = moment().isSame(value, 'date');
            let disabled = !now.isSame(value, 'month');
            let selected = now.isSame(value, 'date');
            return { value, active, disabled, selected }
          })
      })
    }
    this.calendar = calendar;
  }


  select(day:moment.Moment){
    this.dateService.changeDate(day);
  }
}
  