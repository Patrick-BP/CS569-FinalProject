import { Pipe, PipeTransform } from '@angular/core';
import { IGoal } from './goals.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(goals: IGoal[], searchInput: string): any[]{
    if(!searchInput) {
        return  goals;
    }

   searchInput = searchInput.toLowerCase();
   return goals.filter(
       x =>x.title.toLowerCase().includes(searchInput)
   )
 }
}


