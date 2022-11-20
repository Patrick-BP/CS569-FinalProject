import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddGoalComponent } from './addgoal.component';
import { EditgoalComponent } from './editgoal.component';
import { EditstepComponent } from './editstep.component';

import { GoalComponent } from './goal.component';
import { ListComponent } from './list.component';
import { AddstepsComponent } from './addsteps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import { ProgressColorDirective } from './progress-color.directive';
import { ProgressbarDirective } from './progressbar.directive';
import { PassDateDirective } from './passdate.directive';


const MY_ROUTES: Routes = [
  { path: '', component: ListComponent, title: 'Goals' },
  { path: 'add', component: AddGoalComponent, title: 'Add Goal' },
  { path: 'goal/:goal_id', component: GoalComponent, title: 'Goal' },
  {
    path: 'addsteps/:goal_id',
    component: AddstepsComponent,
    title: 'Add Steps',
  },
  { path: 'editg/:goal_id', component: EditgoalComponent, title: 'Update Goal' },
  { path: 'edits/:goal_id/:step_id', component: EditstepComponent, title: 'Update Goal' },
];

@NgModule({
  declarations: [
    AddGoalComponent,
    EditgoalComponent,
    EditstepComponent,
  
    GoalComponent,
    ListComponent,
    AddstepsComponent,
    SearchPipe,
    ProgressColorDirective,
    ProgressbarDirective,
    PassDateDirective,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(MY_ROUTES),
  ],
})
export class GoalsModule {}
