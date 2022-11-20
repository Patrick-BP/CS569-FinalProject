import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from './globalsate.service';

@Injectable({
  providedIn: 'root'
})
export class AttachTokenGuard implements CanActivate {
  constructor(private stateServvice: StateService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateServvice.state.value.token? true : false ;
  }
  
}
