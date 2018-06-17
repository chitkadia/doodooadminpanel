import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { MatSnackBarModule, MatButtonModule, MatInputModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UsersModule } from './user/users.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

import { CommonService } from './shared/common.service';
import { GridService } from './shared/grid.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        UsersModule,
        CommonModule,
        HttpClientModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        SignupComponent
    ],
    providers: [
        CommonService,
        GridService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
