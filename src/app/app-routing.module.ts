import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { AuthService } from './auth.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authguard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
      },

      {
        path: 'users/:id',
        component: UserComponent,
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
      },
    ],
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}