import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';


export interface Task {
  id?: string;
  title: string;
  date?: string;
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public static url = 'https://angular-calendar-c9cb1.firebaseio.com/';
  constructor(public http: HttpClient) { }

  create(task: Task) : Observable<Task>{
    return this.http.post<any>(`${TasksService.url}/${task.date}.json`, task)
    .pipe(map( res => {
      console.log(res);
      return {...task, id: res.name};
    }))
  }

  load(date: moment.Moment) : Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
                    .pipe(map(tasks => {
                      if(!tasks){
                        return [];
                      }
                      return Object.keys(tasks).map( key => ({...tasks[key], id : key}))
                    }))
  }

  remove(task: Task){
    return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
