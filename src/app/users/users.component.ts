import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route);
    this.userService.getUsers().subscribe((response: any) => {
      console.log(response.data);
      this.users = response.data;
    });
  }

  onViewUser(id: number) {
    this.router.navigate([id], {
      relativeTo: this.route,
    });
  }
}
