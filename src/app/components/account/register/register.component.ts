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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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
