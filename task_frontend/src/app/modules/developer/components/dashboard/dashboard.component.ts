import { Component } from '@angular/core';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];

  constructor(private service: DeveloperService) {
    this.getTasks();
}

  getTasks() {
      this.service.getDeveloperTasksById().subscribe({
          next: (res) => {
              console.log(res);
              this.listOfTasks = res;
          },
          error: (err) => {
              console.error('Error fetching tasks:', err);
          }
      });
  }
}
