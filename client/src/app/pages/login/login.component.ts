import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../_shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    PanelModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  attemptingLogin = false;
  readonly unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['test@email.com', [Validators.required, Validators.email]],
      password: ['abcdefg', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (!this.loginForm.valid) return this.showInvalidFormMessage();
    this.attemptingLogin = true;
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (_res) => {
          this.showLoginSuccessMessage();
          this.attemptingLogin = false;
        },
        error: (_err) => {
          this.showFailedLoginMessage();
          this.attemptingLogin = false;
        },
      });
  }

  get emailControl(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.controls['password'];
  }

  private showInvalidFormMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid form data',
    });
  }

  private showFailedLoginMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid email or password',
    });
  }

  private showLoginSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful',
    });
  }
}
