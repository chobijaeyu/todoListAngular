import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.sass']
})
export class TodoContainerComponent implements OnInit {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  loading$: Observable<boolean>;
  todoList$: Observable<Todo[]> = of([])

  constructor(private todoservice: TodoService) {
    this.todoList$ = todoservice.entities$
    this.loading$ = todoservice.loading$
  }

  ngOnInit(): void {
    this.fetchTodo()
  }

  newTodo(todo: Todo) {
    this.todoservice.add(todo)
  }

  fetchTodo() {
    this.todoservice.getAll()
  }

  updateTodo(todo: Todo) {
    this.todoservice.update(todo)
  }

  deleteTodo(todo: Todo) {
    this.todoservice.delete(todo)
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onSorted(ev: CdkDragDrop<string[]>) {
    console.log(ev)
    if (ev.previousContainer !== ev.container) {
      console.log(ev.item.element.nativeElement.textContent)
    }
  }

}
