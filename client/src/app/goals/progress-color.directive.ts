import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStep } from './addGoal.interface';
import { GoalService } from './goal.service';

@Directive({
  selector: '[appProgressColor]'
})
export class ProgressColorDirective implements OnInit{
@Input('appProgressColor') status!:string;
@HostBinding('class') elementClass ="badge-danger"
 
  ngOnInit(): void {
    if(this.status === "not-started"){
      this.elementClass = "badge-primary"
    }else if(this.status === "in-progress"){
      this.elementClass = "badge-warning"
    }else if(this.status === "completed"){
      this.elementClass = "badge-success"
    }
  }

}
