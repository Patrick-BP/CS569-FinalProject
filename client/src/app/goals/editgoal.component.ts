import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../globalsate.service';
import { GoalService } from './goal.service';
import { IGoal, IStep } from './goals.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editgoal',
  templateUrl:'editgoal.component.html',
  styles: [ ]
})
export class EditgoalComponent implements OnInit {
  date = new Date().toISOString().slice(0, 10);
  goal!:IGoal;
  goal_id!:string;
form = inject(FormBuilder).nonNullable.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      deadline: ['',Validators.required],
   
    });
constructor(private goalService: GoalService, private router:Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
      
      this.goal_id = this.activatedRoute.snapshot.paramMap.get('goal_id') as string;
      this.goalService.getGoalById(this.goal_id).subscribe((response)=>{
       this.goal = response.data;
       this.form.patchValue(this.goal) 
      })
 }

  ngOnInit(): void {
  }
  onsubmit(){
this.goalService.updateGoal(this.goal_id,this.form.value as IGoal).subscribe((response)=>{
  if(response.success){
    this.toastr.success('Goal was updated');
    this.router.navigate(['goals']);
  }
})
  }
}
