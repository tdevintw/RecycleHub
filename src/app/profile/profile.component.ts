import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  form: FormGroup;

  user: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser(); // Assuming getCurrentUser() returns a Promise
    if (this.user) {
      this.form.patchValue({
        email: this.user.email,
        name: this.user.name,
        password : this.user.password,
        phone: this.user.phone,
        address: this.user.address,
        city: this.user.city,
        birthDate: this.user.birthDate, 
        photo : this.user.photo,
      });
    }
  }
}