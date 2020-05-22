import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ToDoRoutingModule } from './to-do-routing.module';
import { TodoContainerComponent } from './container/todo-container.component';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { defaultDataServiceConfig } from 'src/app/entity-metadata';
import { TodoService } from 'src/app/services/todo.service';


@NgModule({
  declarations: [TodoContainerComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    RxReactiveFormsModule,
    ToDoRoutingModule,
  ],
  providers: [
    TodoService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }],
})
export class ToDoModule { }
