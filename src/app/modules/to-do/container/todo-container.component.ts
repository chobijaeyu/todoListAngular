import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { WebSocketSubject } from "rxjs/webSocket";
import { map } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { ChangeEvents, FullDocument } from 'src/app/models/changeEvent.model';
import { MergeStrategy } from '@ngrx/data';

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

  wsTodoList$: WebSocketSubject<ChangeEvents>

  constructor(
    private todoservice: TodoService,
  ) {
    this.todoList$ = todoservice.entities$
    this.loading$ = todoservice.loading$
  }

  ngOnInit(): void {
    this.fetchTodo()
    this.ws()
  }

  onItemClick(t: Todo) {
    this.selectedTodoItem = t
    console.log(this.selectedTodoItem)
  }

  newTodo(todo: Todo) {
    this.todoservice.add(todo)
  }

  updateTodo(todo: Todo) {
    this.todoservice.update(todo)
    this.selectedTodoItem = null
  }

  deleteTodo(e: Event, todo: Todo) {
    e.stopPropagation()
    console.log(todo)
    this.todoservice.delete(todo)
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

  ws() {
    this.wsTodoList$ = this.todoservice.wsConnect()
    this.wsTodoList$.subscribe(r => {
      let t: Todo = new Todo()
      console.log(r.operationType)
      switch (r.operationType) {
        case "insert":
          t = new Todo()
          t = this.bindDocToModel(r.fullDocument)
          this.todoservice.upsertOneInCache(t)
          break;

        case "update":
          t = new Todo()
          t = this.bindDocToModel(r.fullDocument)
          this.todoservice.upsertOneInCache(t)
          break
        case "delete":
          this.todoservice.removeOneFromCache(r.documentKey._id.$oid)
          break
        default:
          break;
      }
    })
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
    }
  }

  bindDocToModel(doc: FullDocument) {
    let t: Todo = new Todo()
    t.Deadline = doc.Deadline
    t.Desc = doc.Desc
    t.Done = doc.Done
    t.Img = doc.Img
    t._id = doc._id.$oid
    return t
  }

}
