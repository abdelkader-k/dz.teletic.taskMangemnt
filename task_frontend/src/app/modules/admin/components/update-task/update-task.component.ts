import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {

  id: number = this.route.snapshot.params['id'];
  updateTaskForm: FormGroup;
  listOfDevelopers: any = [];
  listOfPriorities: string[] = ['LOW', 'MEDIUM', 'HIGH'];
  listOfStatus: string[] = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELLED"];

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private adminService: AdminService,
      private snackBar: MatSnackBar,
      private router: Router,
  ) {
      this.getTaskById();
      this.loadUsers();
    // this.initializeForm();
    this.updateTaskForm = this.fb.group({
      developerId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]]
    });
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
        next: (users) => {
          this.listOfDevelopers = users;
          console.log('Users:', users);
        },
        error: (err) => {
            console.error('Failed to load users:', err);
        }
    });
  }

  getTaskById() {
      this.adminService.getTaskById(this.id).subscribe((res) => {
          console.log(res);
          this.updateTaskForm.patchValue(res);
      });
  }

  updateTask() {
    this.adminService.updateTask(this.id, this.updateTaskForm.value).subscribe({
        next: (res) => {
            if (res.id != null) {
                this.snackBar.open("Task updated successfully", "Close", { 
                    duration: 5000 
                });
                this.router.navigateByUrl("/admin/dashboard");
            }
        },
        error: (err) => {
            this.snackBar.open("Something went wrong", "ERROR", { 
                duration: 5000 
            });
            console.error("Update error:", err);
        }
    });
  }
  
}
