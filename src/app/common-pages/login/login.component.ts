import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

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

    if (isSignUp) {
      this.signupForm = new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        isAdmin: new FormControl('',[Validators.required]),
      });
    } else {
      this.signupForm = new FormGroup({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required])
      });
    }
  }

  hidePassword: boolean = true;
  isSignUp: boolean = false;
  action: string = 'Sign In';
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}


  enterApp() {
    if (this.isSignUp) {
      this.httpService.signUp(this.signupForm.value);
    } else {
      this.httpService.logIn(this.signupForm.value);
    }
  }
  

}
