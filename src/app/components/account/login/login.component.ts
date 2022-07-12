import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginSubscribe() {
    this.accountService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/home');
          console.log(data);
        },
        error: (err) => {
          console.log(err), (this.loading = false);
          ;
        },
        complete: () => console.log('connected'),
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.loginSubscribe();
  }
}
