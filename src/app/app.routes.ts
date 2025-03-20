import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';

export const routes: Routes = [
    { path: 'Register', component: RegisterComponent },
    { path: '', redirectTo: 'Index', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
    { path: 'Index', component: IndexComponent},
    { path: 'Panel', component: PanelComponent}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
      ]
  })
export class AppRoutingModule{}