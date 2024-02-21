import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'NoOfBooks', 'action'];
  dataSource = new MatTableDataSource(
    [
      {
        id: 1,
        name: 'Jon Snow',
        contactNo: '+91 8869048566',
        NoOfBooks: 5
      }
    ]
  )

  constructor (
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  getUsers() {
    this.httpService.getAllUsers().subscribe((res: any) => {
      const normalUsers = res.filter((user:any) => !JSON.parse(user.isAdmin));
      this.dataSource = new MatTableDataSource(normalUsers);
    });
  }

  viewCustomer(customer: any) {
    const cust = JSON.parse(JSON.stringify(customer));
    delete cust.password;
    localStorage.setItem('customer', JSON.stringify(cust));
    this.router.navigate([`${cust.id}`], { relativeTo: this.route })
  }
}
