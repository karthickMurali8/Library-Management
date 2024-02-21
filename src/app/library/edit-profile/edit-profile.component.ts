import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  hidePassword: boolean = true;
  userForm;

  constructor(
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.userForm = new FormGroup({
      username: new FormControl(user.username, [Validators.required]),
      password: new FormControl(user.password, [Validators.required])
    });
  }

}
