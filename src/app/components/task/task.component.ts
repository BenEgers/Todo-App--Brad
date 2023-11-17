import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Task } from 'src/app/types/TaskType';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  ngOnInit(): void {
    this.checkDateTime(this.task);
  }

  
  @Input() task! : Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  hasPassed: boolean = false;

  checkDateTime(task: Task) : void {
    const date = new Date(task.day);
    const now = new Date();

    this.hasPassed = now > date;
    console.log(this.hasPassed);
  }

  onDelete(task : Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task : Task) {
    this.onToggleReminder.emit(task);
  }
}
