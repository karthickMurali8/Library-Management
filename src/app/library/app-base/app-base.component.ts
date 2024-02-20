import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent {
  isAdmin: boolean;

  constructor (
    private dialog: MatDialog,
    private httpService: HttpService
  ) {
    this.isAdmin = this.httpService.isAdmin;
  }

  editProfile() {
    this.dialog.open(EditProfileComponent, { width: '500px' });
  }

  logout() {
    this.httpService.logOut();
  }

}
