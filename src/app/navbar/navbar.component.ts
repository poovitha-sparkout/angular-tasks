import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  isLoggedin!: boolean;
  url!: string;

  ngOnInit() {
    this.isLoggedin =
      localStorage.getItem('loggedin')?.toLowerCase() === 'true';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      } //navbar is declared outside router-oulet so this method
    });

    this.authService.logstatusChanged.subscribe(() => {
      this.isLoggedin =
        localStorage.getItem('loggedin')?.toLowerCase() === 'true';

      this.url = this.router.url;
    });
  }

  onLogin() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  onLogout() {
    setTimeout(() => {
      this.router.navigate(['']);
      localStorage.setItem('loggedin', 'false');
      this.authService.logstatusChanged.next(null);
      this.toastr.success('Logout Successful');
    }, 1000);
  }

  onDashboard() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }

  onHome() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
}