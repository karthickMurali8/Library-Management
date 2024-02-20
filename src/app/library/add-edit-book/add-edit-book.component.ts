import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent {
  action: string;
  bookData = {
    name: '',
    description: '',
    price: ''
  }

  constructor(
    public dialogRef: MatDialogRef<AddEditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data?.action ?? 'Add Book';
    this.bookData = data?.book ?? this.bookData;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
