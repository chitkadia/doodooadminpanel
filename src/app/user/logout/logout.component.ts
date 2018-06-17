import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from "@angular/router";

import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private common_service: CommonService
    ) { }

    ngOnInit() {
        // remove user from local storage to log user out
        this.common_service.makeGetRequest("me/logout")
        .subscribe((response) => {
            const userData = response.json();
        });
        localStorage.removeItem('X-Auth-Token');
        localStorage.removeItem("user_email");
        this.router.navigate(['/']);
    }

}
