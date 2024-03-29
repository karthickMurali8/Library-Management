import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { HttpService } from 'src/app/http.service';
import { ToastrService } from 'ngx-toastr';

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
        name: 'Stranger Things',
        description: 'Sci-Fi',
        price: '$40'
      }
    ]
  );
  isAdmin: boolean;
  allBooks: any;

  constructor (
    private dialog: MatDialog,
    private httpService: HttpService,
    private toaster: ToastrService
  ) {
    this.isAdmin = JSON.parse(JSON.parse(localStorage.getItem('user') || '')?.isAdmin);
  }


  ngAfterViewInit(): void {
    this.getAllBooks();
  }

  editBook(book: Object) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '500px',
      data: {
        action: 'Edit Book',
        book: JSON.parse(JSON.stringify(book))
      },
    });

    dialogRef.afterClosed().subscribe((book) => {
      if (book) {
        this.updateBook(book, book.id);
      }
    });
  }

  borrowBook(book: any) {
    this.httpService.borrow(book).subscribe({
      next: (res) => {
        this.toaster.success('Book Successfully Borrowed !'); 
        const user = JSON.parse(localStorage.getItem('user') || '');
        user?.borrowedBooks?.push(book);
        localStorage.setItem('user', JSON.stringify(user));
        this.updateBooksShown();
      }
    });
  }

  addBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((book) => {
      if (book) {
        this.createBook(book);
      }
    });
  }

  createBook(book: Object) {
    this.httpService.createBook(book).subscribe({
      next: (res) => {
        this.toaster.success('Book Added successfully !');
        this.getAllBooks();
      },
      error: (err) => { console.log(err) }
    });
  }

  updateBook(book: Object, id: Number) {
    this.httpService.updateBook(book, id).subscribe({
      next: (res) => {
        this.toaster.success('Book Updated successfully !');
        this.getAllBooks();
      },
      error: (err) => { console.log(err) }
    });
  }

  getAllBooks() {
    this.httpService.getBooks().subscribe({
      next: (res: any) => {
        this.allBooks = res;
        this.updateBooksShown();
      },
      error: (err) => { console.log(err) }
    });
  }

  updateBooksShown() {
    const borrowed = JSON.parse(localStorage.getItem('user') || '')?.borrowedBooks;
    let books;
    if (this.allBooks?.length) {
      books = this.allBooks.filter((a : any) => borrowed.findIndex((b : any) => b.id == a.id) === -1);
    } else {
      books = [];
    }
    this.dataSource = new MatTableDataSource(books);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
}
