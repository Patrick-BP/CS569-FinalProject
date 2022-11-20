import { AfterViewChecked, AfterViewInit, Component,  inject, OnInit,  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../globalsate.service';
import { IAddGoal } from './addGoal.interface';
import { GoalService } from './goal.service';
import { IGoal, IStep } from './goals.interface';

@Component({
  selector: 'app-goal',
  templateUrl:'goal.component.html',
  styles:[`
  .badge {
    border-radius: 0;
    font-size: 12px;
    line-height: 1;
    padding: 0.375rem 0.5625rem;
    font-weight: normal;
  }
  
  .warning{
    background-color:#f94808
  }

  `]
   
})
export class GoalComponent {
  name!:string
  progress = [
    { id: 1, name: 'not-started' },
    { id: 2, name: 'in-progress' },
    { id: 3, name: 'completed' },
  ];

  form = inject(FormBuilder).nonNullable.group({
    status: [''],
  });
  goall!:IStep[];
  goal:IAddGoal={
    _id:'',
    user_id:'', 
    title:'',
    description:'',
    deadline:'', 
    steps:[]
  }
  empty = false;
  goal_id!: string;
  constructor(
    private router: Router,
    private goalService: GoalService,
    private activatedRoute: ActivatedRoute,
    private globalstate: StateService,
  ) {
    this.goal_id = activatedRoute.snapshot.params['goal_id'] as string;
   this.getGoal()

   globalstate.state.subscribe((state) => {
    this.name = state.fullname
  });
  }

  
 
  getGoal(){
    this.goalService.getGoalById(this.goal_id).subscribe((response) => {
      if (response.success) {
        this.goal = response.data ;
        this.goall = response.data.steps ;
        this.empty = this.goal.steps.length <= 0 ? false : true;
        
      }

      
    });
  }
  

 
  addsteps() {
    this.router.navigate(['goals', 'addsteps', this.goal_id]);
  }
  handleChanges(step_id: string) {
    let step!:IStep;
    this.goalService.getStepById(step_id).subscribe((res)=>{
      step =res.data[0]; 
    
    })
    this.goalService.updateStep(this.goal_id, step_id, {...step, status:this.form.get('status')?.value as string}).subscribe((response)=>{
if(response.success){
  this.getGoal()
 
}
    })
  }


  update(step_id: string){

  }

  delete(step_id: string){
   this.goalService.deleteStep(this.goal._id,step_id).subscribe((response) =>{
if(response.success){
  console.log('delete');
  this.getGoal()
}
   }) 
  }
}
