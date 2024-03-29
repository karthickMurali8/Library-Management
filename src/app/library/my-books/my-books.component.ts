import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements AfterViewInit {
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
  selectedId : any;

  constructor (
    private httpService: HttpService,
    private toaster: ToastrService
  ) {}


  ngAfterViewInit(): void {
    this.getMyBooks();
  }

  getMyBooks() {
    this.httpService.getUser().subscribe((res: any) => {
      const index = res.borrowedBooks.findIndex((book : any) => book.id == this.selectedId);
      let data;
      if (index != -1) {
        res.borrowedBooks.splice(index, 1);
      }
      data = res.borrowedBooks;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  returnBook(id: string) {
    this.selectedId = id;
    this.httpService.removeMyBook(id).subscribe((res: any) => {
      this.toaster.success('Book Successfully returned to Library.');
      const user = JSON.parse(localStorage.getItem('user') || '');
      if (user?.borrowedBooks?.length) {
        user.borrowedBooks.splice(
          user.borrowedBooks.findIndex((book : any) => book.id == id)
        , 1);
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.getMyBooks();
    });
  }
}
