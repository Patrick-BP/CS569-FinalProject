import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoalService } from './goal.service';
import { IGoal, IStep } from './goals.interface';

@Component({
  selector: 'app-editstep',
  templateUrl: 'editstep.component.html',
   styleUrls:[]
  
})
export class EditstepComponent implements OnInit {
  date = new Date().toISOString().slice(0, 10);
  step!:IStep[];
  step_id!: string;
  goal!: IGoal
  goal_id!:string;

form = inject(FormBuilder).nonNullable.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      deadline: ['',Validators.required],
   
    });
    constructor(private goalService: GoalService, private router:Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
      
      this.goal_id = this.activatedRoute.snapshot.paramMap.get('goal_id') as string;
      console.log(this.goal_id);
      this.step_id = this.activatedRoute.snapshot.paramMap.get('step_id') as string;
      this.goalService.getStepById(this.step_id).subscribe((response) =>{
        this.step = response.data;
         this.form.patchValue(this.step[0])
      })
     
 }

  ngOnInit(): void {
  }
  onsubmit(){
 this.goalService.updateStep(this.goal_id,this.step_id,this.form.value as IStep).subscribe((response)=>{
  if(response.success){
   this.toastr.success('Step is Updated!!')
    this.router.navigate(['goals','goal',this.goal_id]);
  }
 })
  }
}
