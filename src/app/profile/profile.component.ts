import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

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
      city: ['', Validators.required],
      photo: [null, [Validators.pattern(/\.(jpg|png)$/i)]],
    });
  }


}
