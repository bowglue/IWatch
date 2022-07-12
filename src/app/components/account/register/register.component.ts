import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/services/account-service/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: UntypedFormGroup;
  loading = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      first_name: new UntypedFormControl('', [Validators.required]),
      last_name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  registerSubscribe() {
    this.accountService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err), (this.loading = false);
        },
        complete: () => console.log('registerd'),
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.registerSubscribe();
  }
}
