import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.sass']
})
export class TodoContainerComponent implements OnInit {
  todoA: Observable<Todo[]>
  todoB: Todo[]

  doneA: Observable<Todo[]>
  doneB: Todo[]

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
    console.log(this.selectedTodoItem)
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
    this.todoA.subscribe(t => {
      this.todoB = t
    })
    this.doneA.subscribe(t => {
      this.doneB = t
    })
  }

  updateTodo(todo: Todo) {
    this.todoservice.update(todo)
  }

  deleteTodo(todo: Todo) {
    this.todoservice.delete(todo)
  }


  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let t = { ...event.container.data[event.currentIndex] }
      t.Done = !t.Done
      console.log(t.Done)
      this.todoservice.update(t)
    }
  }

  onSorted(ev: CdkDragDrop<string[]>) {
    if (ev.previousContainer !== ev.container) {
      console.log(ev.item.element.nativeElement.textContent)
    }
  }

}
