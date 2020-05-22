import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Todo } from 'src/app/models/todo.model';

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

    console.log(this.todoForm.controls)
  }

  onOK(t: Todo) {
    this.todoData.emit(t)
  }

}
