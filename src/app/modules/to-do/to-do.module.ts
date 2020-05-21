import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ToDoRoutingModule } from './to-do-routing.module';
import { TodoContainerComponent } from './container/todo-container/todo-container.component';


@NgModule({
  declarations: [ TodoContainerComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ToDoRoutingModule,
  ]
})
export class ToDoModule { }
