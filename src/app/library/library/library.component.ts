import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource(
    [
      {
        id: 1,
        name: 'Game Of Thrones',
        description: 'Fantasy & Historical',
        price: '$80'
      }
    ]
  )

  constructor (
    private dialog: MatDialog
  ) {}


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editBook(id: Number) {
    const modalRef = this.dialog.open(AddEditBookComponent, {
      width: '500px',
      data: {
        action: 'Edit Book',
        id: 0
      },
    });
  }

  borrowBook(id: Number) {}

  addBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }

}
