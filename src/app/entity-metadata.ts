import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Todo: {},
};

const pluralNames = { Todo: "Todo" };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:8080/',
  timeout: 3000, // request timeout 
}