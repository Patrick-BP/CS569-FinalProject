import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPassDate]'
})
export class PassDateDirective implements OnInit {
@Input('appPassDate') currentDate!:string;
@Input('stepstatus') status!:string;
@HostBinding('style.color') color:string="black"
@HostBinding('attr.src') src:string="/assets/dot.png"
  constructor() { 
  
   
  }
  ngOnInit(): void { 
    
    const date = new Date().toISOString().slice(0, 10);
   if((new Date(date).getTime() > new Date(this.currentDate).getTime()) && this.status !=="completed"){
      this.color = "red";
      this.src = "/assets/Blinking_warning.gif";
   }
    
  }

}
