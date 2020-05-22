import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ToDoRoutingModule } from './to-do-routing.module';
import { TodoContainerComponent } from './container/todo-container.component';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { defaultDataServiceConfig } from 'src/app/entity-metadata';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from './todo-form/todo-form.component';


@NgModule({
  declarations: [TodoContainerComponent,TodoFormComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    RxReactiveFormsModule,
    ToDoRoutingModule,
  ],
  providers: [
    TodoService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }],
})
export class ToDoModule { }
