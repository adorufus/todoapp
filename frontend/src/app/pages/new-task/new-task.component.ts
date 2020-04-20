import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.listId = params["listId"];
      }
    )
  }

  createTask(title: string){
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      console.log(newTask);
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
