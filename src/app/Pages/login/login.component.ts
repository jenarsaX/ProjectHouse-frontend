import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/ServiceAuth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{
    loginform: FormGroup;
    errorMessage: string | null = null;
    isloading: boolean = false;
    verpassword : boolean = false;

  togglePasswordVisibility(): void{
    this.verpassword = !this.verpassword;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    ngOnInit(): void {
      if(this.authService.isAuthenticated()){
        this.router.navigate(['/inicio']);
      }
    }
}
