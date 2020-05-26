import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { filter, every, defaultIfEmpty, map } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.sass']
})
export class TodoContainerComponent implements OnInit {
  todoA: Observable<Todo[]>

  doneA: Observable<Todo[]>

  loading$: Observable<boolean>;
  todoList$: Observable<Todo[]>
  fiterSub: Subscription

  selectedTodoItem: Todo

  constructor(
    private todoservice: TodoService,
  ) {
    this.todoList$ = todoservice.entities$
    this.loading$ = todoservice.loading$
  }

  ngOnInit(): void {
    this.fetchTodo()
  }

  onItemClick(t: Todo) {
    this.selectedTodoItem = t
  }

  newTodo(todo: Todo) {
    this.todoservice.add(todo)
  }

  fetchTodo() {
    // this.todoservice.getAll()
    this.todoservice.getWithQuery({ "query": "Done", "param": "false" })
    this.todoservice.getWithQuery({ "query": "Done", "param": "true" })

    this.todoA = this.todoservice.selectors$.entities$.pipe(
      map(e => e.filter(t => !t.Done)),
    )
    this.doneA = this.todoservice.selectors$.entities$.pipe(
      map(e => e.filter(t => t.Done)),
    )
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
      console.log(event.container.data)
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
