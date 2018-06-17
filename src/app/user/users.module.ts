import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { LoginComponent } from './login/login.component';
// import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        // LoginComponent,
        // LogoutComponent
    ]
})

export class UsersModule { }
