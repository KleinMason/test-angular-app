import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { IUser } from '../../_shared/models/user.model';
import { UserService } from '../../_shared/services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    PanelModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  attemptingSignup = false;
  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {
      validators: this.passwordsMatch,
    };

    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      formOptions,
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit = () => {
    if (this.signupForm.invalid) return;
    this.attemptingSignup = true;
    const user: IUser = {
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
    };
    this.userService
      .addUser(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (_newUser) => {
          this.showAccountCreatedMessage();
          this.attemptingSignup = false;
          this.router.navigate(['/login']);
        },
        error: (_error) => {
          this.showErrorCreatingAccountMessage();
          this.attemptingSignup = false;
        },
      });
  };

  passwordsMatch = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  };

  get firstNameControl(): AbstractControl {
    return this.signupForm.controls['firstName'];
  }

  get lastNameControl(): AbstractControl {
    return this.signupForm.controls['lastName'];
  }

  get emailControl(): AbstractControl {
    return this.signupForm.controls['email'];
  }

  get passwordControl(): AbstractControl {
    return this.signupForm.controls['password'];
  }

  get confirmPasswordControl(): AbstractControl {
    return this.signupForm.controls['confirmPassword'];
  }

  showErrorCreatingAccountMessage = () => {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error creating account',
    });
  };

  showAccountCreatedMessage = () => {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail:
        'Account created successfully! You can now login with your credentials.',
      life: 8000,
    });
  };
}
