import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent {

  constructor (
    private dialog: MatDialog
  ) {}

  editProfile() {
    this.dialog.open(EditProfileComponent, { width: '500px' });
  }

}
