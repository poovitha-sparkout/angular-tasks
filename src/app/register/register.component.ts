import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.get('name')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value
        )
        .subscribe((response) => {
          if (response) {
            this.toastr.success('User Registered Successfully');
          } else {
            this.toastr.warning('User Registered Already ');
          }
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        });
    }
  }
}