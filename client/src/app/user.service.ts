import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './goals/goals.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: IUser){
   return this.http.post<{success: number, data: string}>(environment.server+`/users/login`, user);
  }
  addUser(user: IUser){
    return this.http.post<{success: number, data: IUser}>(environment.server+`/users/signup`, user);  
  }
}
