import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/service/date.service';
import { TasksService, Task } from 'src/app/service/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organaizer',
  templateUrl: './organaizer.component.html',
  styleUrls: ['./organaizer.component.scss']
})
export class OrganaizerComponent implements OnInit {
  public form: FormGroup
  public tasks:Task[] = [];

  constructor(public dateService: DateService,
              public tasksService: TasksService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap( value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    })


    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit(){
    let title = this.form.value.title;
    let task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }
    this.tasksService.create(task).subscribe( task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err));
    console.log(title)
  }

  remove(task: Task){
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter( t => t.id !== task.id)
    }, err => console.error(err));
  }
}
