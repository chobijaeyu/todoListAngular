import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Todo } from '../models/todo.model';
import { environment } from 'src/environments/environment';
import { WebSocketSubjectConfig, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends EntityCollectionServiceBase<Todo> {

  wsEndPoint = `${environment.baseWsUrl}/todo/ws`

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Todo", serviceElementsFactory);
  }

  wsConnect() {
    let wsConfig: WebSocketSubjectConfig<any> = {
      url: this.wsEndPoint,
    }
    return webSocket(wsConfig)
  }

}


