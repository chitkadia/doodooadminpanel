import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
        ReactiveFormsModule
	],
	declarations: [
		SanitizeHtmlPipe
	],
	 entryComponents: [
        
    ],
	exports : [
		SanitizeHtmlPipe
    ],
	providers: [
    
    ]
})
export class SharedModule { }
