import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // TODO: remove this
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    if (!this.loginForm.valid)
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid form data',
      });
  }

  get emailControl(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.controls['password'];
  }
}
