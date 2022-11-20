import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAddGoal } from './addGoal.interface';
import { IGoal, IStep } from './goals.interface';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private httpClient: HttpClient) {}

  getGoalsByUser(user_id: string) {
    return this.httpClient.get<{ success: number; data: IAddGoal[] }>(
      environment.server + '/goals/' + user_id
    );
  }

  getGoalById(goal_id: string) {
    return this.httpClient.get<{ success: number; data: IAddGoal }>(
      environment.server + '/goals/' + goal_id+ '/goal'
    );
  }

  addGoal(goal: IGoal) {
    return this.httpClient.post<{ success: number , data:IAddGoal}>(
      environment.server + `/goals`,
      goal
    );
  }

  updateGoal(goal_id: string, goal: IGoal) {
    return this.httpClient.patch<{ success: number }>(
      environment.server + `/goals/${goal_id}`,
      goal
    );
  }

  deleteGoal(goal_id: string) {
    return this.httpClient.delete<{ success: number }>(
      environment.server + `/goals/${goal_id}`
    );
  }

  // #################################

  getStepById(step_id: string){
    return this.httpClient.get<{ success: number; data: IStep[] }>(
      environment.server + `/goals/step/${step_id}`
    );
  }

  getStepsByGoal(goal_id: string) {
    return this.httpClient.get<{ success: number; data: IGoal[] }>(
      environment.server + `/goals/${goal_id}/steps`
    );
  }

  addStep(goal_id: string, step: IStep) {
    return this.httpClient.patch<{
        data: IAddGoal; success: number 
}>(
      environment.server + `/goals/${goal_id}/steps`,
      step
    );
  }

  updateStep(goal_id: string, step_id: string, step: IStep) {
    return this.httpClient.patch<{ success: number }>(
      environment.server + `/goals/${goal_id}/steps/${step_id}`,
      step
    );
  }

  deleteStep(goal_id: string, step_id: string) {
    return this.httpClient.delete<{ success: number }>(
      environment.server + `/goals/${goal_id}/steps/${step_id}`
    );
  }
}
