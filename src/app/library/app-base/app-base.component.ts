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
    this.isAdmin = JSON.parse(JSON.parse(localStorage.getItem('user') || '')?.isAdmin);
  }

  editProfile() {
    const modalRef = this.dialog.open(EditProfileComponent, { width: '500px' });
    modalRef.afterClosed().subscribe(res => {
      if (res) {
        this.updateUser(res);
      }
    });
  }

  logout() {
    this.httpService.logOut();
  }

  updateUser(user: {username: string, password: string}) {
    this.httpService.updateUser(user);
  }

}
