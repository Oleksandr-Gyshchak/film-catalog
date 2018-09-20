import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../shared/services/messages.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';
  showSpinner = false;

  loginForm: FormGroup;

  formErrors = {
    'userName': '',
    'userPassword': ''
  };

  validationMessages = {
    'userName': {
      'required': 'Поле не может быть пустым.',
      'minlength': 'Значение должно быть не менее 5х символов.',
      'maxlength': 'Значение не должно быть больше 25 символов.',
      'pattern': 'Не правильный формат email адреса.'
    },
    'userPassword': {
      'required': 'Поле не может быть пустым.',
      'minlength': 'Значение должно быть не менее 5х символов.',
      'maxlength': 'Значение не должно быть больше 25 символов.',
      'pattern': 'Не правильный формат пароля (Минимум 5 символов, Как минимум один верхний регистр английская буква, минимум одна цифра)'
    }
  };


  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/main']);
    }
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern('[a-zA-Z0-9.-]*')

      ]],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern('[a-zA-Z0-9.-]*')
      ]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChange());
  }

  onValueChange() {
    if (!this.loginForm) {
      return;
    }
    // tslint:disable-next-line:forin
    for (const item in this.formErrors) {
      this.formErrors[item] = '';
      const control = this.loginForm.get(item);

      if (control && control.dirty && !control.valid) {
        const message = this.validationMessages[item];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[item] += message[key] + ' ';
        }
      }
    }

  }

  makeClear() {
    this.errorMessage = '';
    this.loginForm.reset();
  }

  credentialsCheck() {
    this.errorMessage = '';
    this.showSpinner = true;
    const credentials = this.loginForm.value;
    this.authService.loginCheck(credentials.userName, credentials.userPassword)
      .subscribe(
        (data: any) => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.loginForm.value.userName}, Вы успешно вошли в систему. Добро пожаловать!`
          });
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 2000);
        },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.error.status_message;
          console.log('error', err);
        }
      );

    this.showSpinner = false;
  }
}
