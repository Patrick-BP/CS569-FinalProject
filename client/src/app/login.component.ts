import { createInjectableType } from '@angular/compiler';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from './globalsate.service';
import { IUser } from './goals/goals.interface';
import { IState } from './state.interface';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
form = inject(FormBuilder).nonNullable.group({
    email:['user1@miu.edu',Validators.required ],
    password:['123', Validators.required]
})
  constructor(
    private userService: UserService,
    private router: Router,
    private stateService: StateService

  ) { }
  login(){
this.userService.login(this.form.value as IUser).subscribe((response) =>{
    if(response.success){
        console.log('Welcome!');
        const decoded = jwt_decode(response.data) as IUser;
        console.log(decoded);
        const state = {
            user_id:decoded.user_id,
            email:decoded.email,
            fullname: decoded.fullname,
            token: response.data,
        };
        this.stateService.state.next(state as IState);
        localStorage.setItem('@STATE', JSON.stringify(state));
         this.router.navigate(['goals']);
    }else{
        console.log('Login Failed');
    }
})
  }
  ngOnInit(): void {
  }

}

