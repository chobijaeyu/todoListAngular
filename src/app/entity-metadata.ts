import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { Todo } from './models/todo.model';

const entityMetadata: EntityMetadataMap = {
  Todo: {
    selectId: (todo: Todo) => todo._id
  },
};


const pluralNames = { Todo: "Todo" };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3999/',
  timeout: 3000, // request timeout 
}