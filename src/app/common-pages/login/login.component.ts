import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input()
  set signUp(isSignUp: boolean) {
    this.isSignUp = isSignUp ?? false;
    this.action = isSignUp ? 'Sign Up' : 'Sign In'
  }

  hidePassword: boolean = true;
  isSignUp: boolean = false;
  action: string = 'Sign In';

  constructor (
    private router: Router
  ) {}


  enterApp() {
    if (this.isSignUp) {
      this.router.navigate(['../login']);
    } else {
      this.router.navigate(['app/library']);
    }
  }
  

}
