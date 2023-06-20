import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all the required fields.');
    } else {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe((response) => {
        console.log(response);
        if (response.token !== null) {
          this.toastr.success('Login Successful');
          this.authService.logstatusChanged.next(null);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        } else {
          this.toastr.warning(response.message);
          if (response.message === 'User is not registered') {
            setTimeout(() => {
              this.router.navigate(['/register']);
            }, 1000);
          }
        }
      });
    }
  }

  findUsername(){
    localStorage.getItem('register')
  }
}