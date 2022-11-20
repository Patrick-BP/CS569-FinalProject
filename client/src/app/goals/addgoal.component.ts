import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../globalsate.service';
import { GoalService } from './goal.service';
import { IGoal, IStep } from './goals.interface';

@Component({
  selector: 'app-add',
  templateUrl: 'addgoal.component.html',
  styles: [''],
})
export class AddGoalComponent implements OnInit {
  date = new Date().toISOString().slice(0, 10);
  user_id!: string;
  steps: IStep[] = [];
  goal!: IGoal;
  goal_id!: string;
  form = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    deadline: ['', Validators.required],
  });
  constructor(
    private goalService: GoalService,
    private router: Router,
    private globalstate: StateService, private toaster: ToastrService
  ) {
    globalstate.state.subscribe((data) => {
      this.user_id = data.user_id;
    });
  }

  ngOnInit(): void {}
  onsubmit() {
    this.goal = {
      ...this.form.value,
      user_id: this.user_id,
      steps: this.steps,
    } as IGoal;
    this.goalService.addGoal(this.goal).subscribe((response) => {
      this.goal_id = response.data._id;
      if (response.success) {
        this.toaster.success('Gaol is added successfuly!!')
        this.router.navigate(['goals', 'addsteps', this.goal_id], {
          state: this.goal,
        });
      }
    });
  }
}
