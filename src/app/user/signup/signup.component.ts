import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;

  constructor(public appService: AppService, public router: Router, public toastr: ToastrManager) { }

  ngOnInit(): void {

  }

  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  }

  public signUpFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warningToastr('Enter First Name');
    } else if (!this.lastName) {
      this.toastr.warningToastr('Enter Last Name');
    } else if (!this.mobile) {
      this.toastr.warningToastr('Enter Mobile');
    } else if (!this.email) {
      this.toastr.warningToastr('Enter Email');
    } else if (!this.password) {
      this.toastr.warningToastr('Enter Password');
    } else if (!this.apiKey) {
      this.toastr.warningToastr('Enter your API Key');
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }
      console.log(data);
      this.appService.signUpFunction(data).subscribe((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          this.toastr.successToastr('SignUp Successfull')
          setTimeout(() => {
            this.goToSignIn();
          }, 2000);
        } else {
          this.toastr.errorToastr(apiResponse.message);
        }
      }, (err) => {
        this.toastr.errorToastr('Some Error Occured');
      });
    }//end condition
  }//end signUpFunction

}
