import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private router: Router,
  ) {
      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
      });
  }

  togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    //   if (this.loginForm.valid) {
    //       console.log(this.loginForm.value);
    //       // Add your authentication logic here
    //   }
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
            console.log(res);
            if (res?.userId != null) {
              const user = {
                id: res.userId,
                role: res.userRole
              };
              
              StorageService.saveUser(user);
              StorageService.saveToken(res.jwt);
              
              if (StorageService.isAdminLoggedIn()) {
                  this.router.navigate(['/admin/dashboard']);
              } else if (StorageService.isDeveloperLoggedIn()) {
                  this.router.navigate(['/developer/dashboard']);
              }

                this.snackbar.open('Login successful', 'Close', { duration: 5000 });
            } else {
              this.snackbar.open('Login failed. Try again', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
            }
        },
        error: (err) => {
            this.snackbar.open(
                err.error?.message || 'Login failed', 
                'Close', 
                { duration: 5000, panelClass: 'error-snackbar' }
            );
        }
    });

  }

}
