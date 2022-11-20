import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../globalsate.service';
import { IAddGoal } from './addGoal.interface';
import { GoalService } from './goal.service';
import { IGoal } from './goals.interface';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styles: ['.warning{background-color:#f94808}'],
})
export class ListComponent implements OnInit {
  goals!: IAddGoal[];
  user_id!: string;
  goal_id!: string;
  searchInput!: string;
  progress!: string;
  name!:string
  constructor(
    private router: Router,
    private globalstate: StateService,
    private goalService: GoalService
  ) {
    globalstate.state.subscribe((state) => {
      this.user_id = state.user_id;
      this.name = state.fullname
    });
  }

  onGetGoalsByUser() {
    this.goalService.getGoalsByUser(this.user_id).subscribe((response) => {
      if (response.success) {
        this.goals = response.data.reverse();
      }
    });
  }
  ngOnInit(): void {
    this.onGetGoalsByUser();
  }
  onDelete(id: string) {
    this.goalService.deleteGoal(id).subscribe((response) => {
      if (response.success) {
        this.onGetGoalsByUser();
      }
    });
  }

 
}
