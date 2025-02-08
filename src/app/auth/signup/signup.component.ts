import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      city : ['', Validators.required],
      photo: [null, [Validators.required, Validators.pattern(/\.(jpg|png)$/i)]],  

    });
  }

  signup() {
    if (this.form.invalid) return;

    const user = { ...this.form.value , points : 0};
    this.authService.register(user).subscribe((success) => {
      if (success) this.router.navigate(['/login']);
    });
  }
}
