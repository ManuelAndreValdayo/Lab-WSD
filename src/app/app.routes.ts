import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { AuthResolver } from './resolvers/auth.resolver';



export const routes: Routes = [
    { path: 'Register', component: RegisterComponent },
    { path: '', redirectTo: 'Index', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
    { path: 'Index', component: IndexComponent},
    { path: 'Panel', component: PanelComponent,
        children: [
            { 
                path: 'Profile', 
                resolve: { auth: AuthResolver },
                component: ProfileComponent 
            },
            { 
                path: 'Card', 
                resolve: { auth: AuthResolver },
                component: CardComponent 
            }
        ], resolve: { auth: AuthResolver }
    },
    { path: '**', redirectTo: 'Index', pathMatch: 'full' }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
      ]
  })
export class AppRoutingModule{}