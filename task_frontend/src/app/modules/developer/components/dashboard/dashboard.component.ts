import { Component } from '@angular/core';
import { DeveloperService } from '../../services/developer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];

  constructor(private service: DeveloperService,
    private snackBar: MatSnackBar,
  ) {
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

  updateStatus(id: number, status: string) {
    this.service.updateStatus(id, status).subscribe({
        next: (res) => {
            if (res.id != null) {
                this.snackBar.open("Task status updated successfully", "Close", { 
                    duration: 5000 
                });
                this.getTasks();
            }
        },
        error: (err) => {
            this.snackBar.open("Error updating task status", "Error", { 
                duration: 5000 
            });
            console.error('Update error:', err);
        }
    });
  }

}
