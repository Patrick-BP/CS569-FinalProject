import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPassDate]'
})
export class PassDateDirective implements OnInit {
@Input('appPassDate') stepDeadline!:string;
@Input('stepstatus') status!:string;
@HostBinding('style.color') color:string="black"
@HostBinding('attr.src') src:string="/assets/dot.png"
  constructor() { 
  
   
  }
  ngOnInit(): void { 
    
    const toDayDate = new Date().toISOString().slice(0, 10);
   if((new Date(toDayDate).getTime() > new Date(this.stepDeadline).getTime()) && this.status !=="completed"){
      this.color = "red";
      this.src = "/assets/Blinking_warning.gif";
   }
    
  }

}
