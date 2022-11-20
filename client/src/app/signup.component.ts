import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from './goals/goals.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-signup',
  templateUrl:'signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {
form = inject(FormBuilder).nonNullable.group({
    fullname:['user1 user',Validators.required],
    email:['user1@miu.edu',Validators.required ],
    password:['123', Validators.required]
})
  constructor(private userService: UserService, private router: Router) { }
  onSubmit(){
this.userService.addUser(this.form.value as IUser).subscribe((response) =>{
    if(response.success){
        console.log('Saved successfuly!');
        this.router.navigate(['','login'])
    }else{
        console.log('Register Failed');
    }
})
  }
  ngOnInit(): void {
  }

}
