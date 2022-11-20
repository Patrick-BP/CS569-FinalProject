import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './globalsate.service';
import { AttachTokenInterceptor } from './attach-token.interceptor';
import { AttachTokenGuard } from './attach-token.guard';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const refreshToken = (stateService: StateService) => {
  return () => {
    const stored_state = localStorage.getItem('@STATE');
    if (stored_state) {
      stateService.state.next(JSON.parse(stored_state));
    }
  };
};

const MY_ROUTES: Routes = [
  
  { path: '', component: HomeComponent, title: 'Welcome' },
  { path: 'login', component:LoginComponent, title: 'Welcome' },
  { path: 'signup', component:SignupComponent, title: 'Welcome' },
  {
    path: 'goals',
    loadChildren: () =>
      import('./goals/goals.module').then((m) => m.GoalsModule), canActivate:[AttachTokenGuard]
  },
  {path:'**' , redirectTo:'' }
];
@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent],
  imports: [BrowserModule,FormsModule,ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(MY_ROUTES), BrowserAnimationsModule, 
  ToastrModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: refreshToken, 
      deps: [StateService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
