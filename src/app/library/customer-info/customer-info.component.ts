import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'price', 'date', 'action'];
  dataSource = new MatTableDataSource(
    [
      {
        id: 1,
        name: 'Game Of Thrones',
        description: 'Fantasy & Historical',
        price: '$80',
        isBorrowed: true,
        date: new Date()
      }
    ]
  );
  customer;

  constructor (
  ) {
    this.customer = JSON.parse(localStorage.getItem('customer') || '');
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.customer.transactions;
  }
}
