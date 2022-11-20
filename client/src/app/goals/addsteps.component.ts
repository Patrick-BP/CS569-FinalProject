import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../globalsate.service';
import { GoalService } from './goal.service';
import { IGoal, IStep } from './goals.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addsteps',
  templateUrl:'addsteps.component.html',
  styles: [''],
})
export class AddstepsComponent implements OnInit {
  max!: string;
  min!: string;
  goal_id!: string;
  steps!: IStep;
  form = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    deadline: ['', Validators.required],
  });

  constructor(
    private goalService: GoalService,
    private router: Router,
    private globalstate: StateService,
    private activatedRouter: ActivatedRoute, private toastr: ToastrService
  ) {
    this.goal_id = activatedRouter.snapshot.paramMap.get('goal_id') as string;
    goalService.getGoalById(this.goal_id).subscribe((res) => {
      if (res.success) {
        this.max = res.data.deadline.slice(0, 10);
        if (res.data.steps.length > 0) {
          this.min = res.data.steps[res.data.steps.length - 1].deadline.slice(
            0,
            10
          );
        } else {
          this.min = new Date().toISOString().slice(0, 10);
        }
      }
    });
  }

  ngOnInit(): void {}
  onsubmit() {
    this.steps = this.form.value as IStep;
    this.goalService.addStep(this.goal_id, this.steps).subscribe((response) => {
      if(response.success){
        this.toastr.success('Step is added successfuly!!');
        this.router.navigate(['goals','goal', this.goal_id]);
      }
    });
    
  }
}
