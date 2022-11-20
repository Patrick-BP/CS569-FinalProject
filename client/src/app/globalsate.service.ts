import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IState } from './state.interface';


@Injectable({
  providedIn: 'root'
})
export class StateService {
state: BehaviorSubject<IState> = new BehaviorSubject({
  user_id:'',
  email:'',
  fullname:'',
  token:'',

})
  constructor() { }
}
