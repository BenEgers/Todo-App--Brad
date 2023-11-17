import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/types/TaskType';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask : EventEmitter<Task> = new EventEmitter();
  
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService : UiService) {
    this.subscription = this.uiService
              .onToggle()
              .subscribe((value) => (this.showAddTask = value));
  }
  
  onSubmit() {
    if(!this.text) {
      alert('Please add a task!')
      return;
    }

    this.day = new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'America/Paramaribo',
        }).format(new Date(this.day));

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.text = ''
    this.day = ''
    this.reminder = false

    this.onAddTask.emit(newTask);  
  }
}
