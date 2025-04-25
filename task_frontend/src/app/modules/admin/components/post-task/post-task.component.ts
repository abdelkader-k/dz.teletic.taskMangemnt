import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {

  developers: any = [];
  priorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  taskForm: FormGroup;


  constructor(private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.loadUsers();

    this.taskForm = this.fb.group({
      developerId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
        next: (users) => {
          this.developers = users;
          console.log('Users:', users);
        },
        error: (err) => {
            console.error('Failed to load users:', err);
        }
    });
  }

  postTask() {
    console.log('New Task:', this.taskForm.value);
  }

}
