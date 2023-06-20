import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  editUserForm!: FormGroup;
  users: any[] = [];
  user_id: any;
  selectedUserIndex: any;
  editMode: boolean = false;
  showOptions: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userDeleted.subscribe(() => {
      this.fetchUsers();
    });
    this.userService.userUpdated.subscribe(() => {
      this.fetchUsers();
    });
    this.userService.userAdded.subscribe(() => {
      this.fetchUsers();
    });
    this.fetchUsers();
    this.editUserForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

  onDelete(id: number) {
    this.userService.deleteUserById(id).subscribe(
      (response: any) => {
        this.userService.userDeleted.next(null);
      },
      (error) => {
        console.log('Error deleting user:', error);
      }
    );
  }

  displayStyle = 'none';

  openPopup(user: any) {
    this.displayStyle = 'block';
    if (user) {
      this.editMode = true;
      this.user_id = user.id;

      this.editUserForm.setValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        occupation: user.occupation,
        avatar: user.avatar,
      });
    }
  }
  closePopup() {
    this.editMode = false;
    this.displayStyle = 'none';
    this.editUserForm.reset();
    this.showOptions = false;
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      this.selectedUserIndex = this.users.findIndex(
        (user) => user.id === this.user_id
      );
      if (this.selectedUserIndex === -1) {
        this.userService.addUser(this.editUserForm.value).subscribe(
          (response) => {
            console.log('User added successfully.');
            console.log(response);
            this.userService.userAdded.next(null);
          },
          (error) => {
            console.log('Error adding user:', error);
          }
        );
      } else {
        this.userService
          .updateUserById(this.user_id, this.editUserForm.value)
          .subscribe(
            (response) => {
              console.log('User updated successfully.');
              console.log(response);
              this.userService.userUpdated.next(null);
            },
            (error) => {
              console.log('Error updating user:', error);
            }
          );
      }
      this.closePopup();
    } else {
      // Form is invalid, display error messages for each invalid field
      Object.keys(this.editUserForm.controls).forEach((key) => {
        const control = this.editUserForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  seeMore() {
    this.showOptions = true;
  }
  hide() {
    this.showOptions = false;
  }
}