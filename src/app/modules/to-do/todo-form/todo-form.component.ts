import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, date } from '@rxweb/reactive-form-validators';
import { Todo } from 'src/app/models/todo.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup
  @Input() todo: Todo
  @Output() private todoData: EventEmitter<Todo> = new EventEmitter()
  constructor(
    private fb: RxFormBuilder,
  ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.formGroup(new Todo())

    if (this.todo) {
      this.todoForm.patchValue(this.todo)
    }
  }

  onOK(t: Todo) {
    this.todoData.emit(t)
  }

  objectIdFromDate(date) {
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
  };


  dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

}
