import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
    return this.webRequestService.post("list/create", { title })
  }

  getLists(){
    return this.webRequestService.get('list/all');
  }

  createTask(title: string, listId: string){
    return this.webRequestService.post('task/create', { title, listId });
  }

  getTasks(listId: string){
    return this.webRequestService.get(`task/all?listId=${listId}`);
  }
}
