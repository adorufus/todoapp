import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any[];
  tasks: any[];
  isCompleted: boolean[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.taskService.getTasks(params.listId).subscribe((tasks: any[]) => {
          console.log(tasks['data']);
          this.tasks = tasks['data'];

          console.log(tasks);

          for(var i: number = 0; i < this.tasks.length; i++){
            this.isCompleted.push(tasks[i]['completed']);
            console.log(this.isCompleted);
          }

        });
      }
    )

    this.taskService.getLists().subscribe((lists: any[]) => {
      console.log(lists);
      this.lists = lists;
    });
  }

}
