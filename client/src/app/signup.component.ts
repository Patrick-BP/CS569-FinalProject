import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from './goals/goals.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: [],
})
export class SignupComponent implements OnInit {
  message!: { success: boolean; error?: string };
  form = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }
  constructor(private userService: UserService, private router: Router) {}
  onSubmit() {
    this.userService.addUser(this.form.value as IUser).subscribe((response) => {
      if (response.success) {
        console.log('Saved successfuly!');
        this.router.navigate(['', 'login']);
      } else {
        this.message = response;
      }
    });
  }
  ngOnInit(): void {}
}
