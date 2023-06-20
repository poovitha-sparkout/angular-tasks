import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isLoggedin!: boolean;
  url!: string;

  ngOnint() {
    this.isLoggedin = localStorage.getItem('loggedin') as unknown as boolean;
    this.route.url.subscribe((url) => (this.url = url as unknown as string));
    this.authService.logstatusChanged.subscribe(() => {
      this.isLoggedin = localStorage.getItem('loggedin') as unknown as boolean;
      this.route.url.subscribe((url) => (this.url = url as unknown as string));
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
   
  }

  onLogout() {
    localStorage.setItem('loggedin', 'false');
    this.router.navigate(['']);
    this.authService.logstatusChanged.next(null);
  }
}

