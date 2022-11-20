import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './globalsate.service';
import { IState } from './state.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  state!:IState;
  constructor(private globalstate:StateService , private router: Router){
    globalstate.state.subscribe((state)=>{
      this.state = state
    })
  }
  logout(){
    this.globalstate.state.next({
      user_id:'',
      email: '',
      fullname: '',
      token: '',
    });
    localStorage.clear();
    this.router.navigate(['']);
  }

  
}
