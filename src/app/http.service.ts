import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverURL = 'http://localhost:3000';
  isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  signUp(body: any) {
    this.http.post(`${this.serverURL}/auth/register`, body).subscribe({
      next: (res) => { 
        this.router.navigate(['login'], { relativeTo: this.route });
      },
      error: (err) => { 
        console.log(err)
      }
    });
  }

  logIn(body: any) {
    this.http.post(`${this.serverURL}/auth/login`, body).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.isAdmin = JSON.parse(res?.user?.isAdmin);
        this.router.navigate(['app/library']);
      },
      error: (err) => { console.log(err) }
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['common/login']);
  }




  getBooks() {
    return this.http.get(`${this.serverURL}/books`);
  }

  createBook(payload: Object) {
    return this.http.post(`${this.serverURL}/books`, payload);
  }

  updateBook(payload: Object, id: Number) {
    return this.http.put(`${this.serverURL}/books/${id}`, payload);
  }




  getUser() {
    const userId = JSON.parse(localStorage.getItem('user') || '')?.id;
    return this.http.get(`${this.serverURL}/users/${userId}`);
  }

  removeMyBook(id: string) {
    const userId = JSON.parse(localStorage.getItem('user') || '')?.id;
    const params = new HttpParams().set('userId', userId.toString()).set('id', id);
    return this.http.delete(`${this.serverURL}/users/borrowedBooks`, { params });
  }

  borrow(book: any) {
    const userId = JSON.parse(localStorage.getItem('user') || '')?.id;
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.put(`${this.serverURL}/users/borrowedBooks`, book, { params });
  }



  getAllUsers() {
    return this.http.get(`${this.serverURL}/users`);
  }

  updateUser(userInfo: {username: string, password: string}) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    user.username = userInfo.username;
    user.password = userInfo.password;
    localStorage.setItem('user', JSON.stringify(user));
    this.http.put(`${this.serverURL}/users/${user.id}`, user).subscribe(res => {});
  }
}
