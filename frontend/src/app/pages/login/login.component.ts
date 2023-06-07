import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

const ERROR_MESSAGES = {
  required: 'This field is required.',
  invalidUsername: 'Special characters not allowed.',
  email: 'Invalid email format.',
  minlength: 'Minimum 5 characters.',
  invalidDomain: 'Invalid email domain.',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.subscribeToEmailOrUsernameChanges();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      emailOrUsername: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  subscribeToEmailOrUsernameChanges() {
    const emailOrUsernameControl = this.loginForm.get('emailOrUsername');
    if (emailOrUsernameControl) {
      emailOrUsernameControl.valueChanges.subscribe((value) => {
        this.updateEmailOrUsernameValidator(value);
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { emailOrUsername, password } = this.loginForm.value;
      this.authService.login(emailOrUsername, password).subscribe(
        (response) => {
          // Handle successful login
          // Navigate to the home page
          this.router.navigateByUrl('/home');
        },
        (error) => {
          // Handle login error
          this.errorMessage = 'Invalid email or password.';
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control && control.invalid && control.touched) {
      const errors = control.errors;
      if (errors) {
        const errorKey = Object.keys(errors)[0] as keyof typeof ERROR_MESSAGES;
        return ERROR_MESSAGES[errorKey];
      }
    }
    return '';
  }

  private updateEmailOrUsernameValidator(value: string) {
    const emailOrUsernameControl = this.loginForm.get('emailOrUsername');
    if (emailOrUsernameControl) {
      if (value.includes('@')) {
        emailOrUsernameControl.setValidators([
          Validators.required,
          Validators.email,
          this.emailDomainValidator,
        ]);
      } else {
        emailOrUsernameControl.setValidators([
          Validators.required,
          this.usernameValidator,
        ]);
      }
      emailOrUsernameControl.markAsDirty(); // Mark the control as dirty
      emailOrUsernameControl.updateValueAndValidity();
    }
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const usernamePattern: RegExp = /^[a-zA-Z0-9_]*$/;
    if (!usernamePattern.test(value)) {
      return { invalidUsername: true };
    }
    return null;
  }

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    const emailParts: string[] = value.split('@');

    if (emailParts.length !== 2 || emailParts[1].trim() === '') {
      return { invalidDomain: true };
    }

    const domain: string = emailParts[1].trim();
    const domainPattern: RegExp = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!domainPattern.test(domain)) {
      return { invalidDomain: true, email: true };
    }

    return null;
  }

  get emailOrUsernameControl(): AbstractControl | null {
    return this.loginForm.get('emailOrUsername');
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  isFormControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && control.touched && !control.pristine;
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }
}
