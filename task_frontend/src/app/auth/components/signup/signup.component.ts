import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router, 
  ) {
      this.signupForm = this.fb.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]]
      }, 
      // { validator: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
      // if (this.signupForm.valid) {
      //     console.log(this.signupForm.value);
      //     // Add your form submission logic here
      // }

    if (this.signupForm.invalid) return;

    const password = this.signupForm.get('password')!.value;
    const confirmPassword = this.signupForm.get('confirmPassword')!.value;
    
    if (password !== confirmPassword) {
        this.snackbar.open('Passwords do not match', 'Close', { 
            duration: 5000, 
            panelClass: 'error-snackbar' 
        });
        return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
            if (res?.id != null) {
                this.snackbar.open('Signup successful', 'Close', { duration: 5000 });
                this.router.navigate(['/login']);
            } else {
              this.snackbar.open('Signup failed. Try again', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
            }
        },
        error: (err) => {
            this.snackbar.open(
                err.error?.message || 'Signup failed', 
                'Close', 
                { duration: 5000, panelClass: 'error-snackbar' }
            );
        }
    });
  }

  // passwordMatchValidator(form: FormGroup) {
  //     const password = form.get('password').value;
  //     const confirmPassword = form.get('confirmPassword').value;
  //     return password === confirmPassword ? null : { mismatch: true };
  // }

}
