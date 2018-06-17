import { Injectable, ViewChild } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Router } from "@angular/router";
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

declare var $:any;

@Injectable()

export class CommonService {
    private baseUrl: string = environment.api_endpoint;
    private headerData: HttpHeaders;
    private headerDataWithReferer: HttpHeaders;
    private authKey = localStorage.getItem("X-Auth-Token");

    public prevUrl : string = "";

    public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * Construction set header variable for all request method
     * @param http ,To perform any request.
     */
    constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar, public titleService: Title) {
        if (this.authKey) {
            this.headerData = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-SH-Source': 'WEB_APP',
                'Accept': 'application/json',
                'X-Authorization-Token': this.authKey
            });

            this.headerDataWithReferer = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-SH-Source': 'WEB_APP',
                'Accept': 'application/json',
                'X-Authorization-Token': this.authKey
            });
        } else {
            this.headerData = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-SH-Source': 'WEB_APP',
                'Accept': 'application/json',
            });

            this.headerDataWithReferer = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'X-SH-Source': 'WEB_APP',
                'Accept': 'application/json'
            });
        }
    }

    /**
     * Function is used to make Get request.
     * @param uriSegment,Mix,Last two segment of URL
     * 
     * @return Json,Json Object,Data from server
     */

    makeGetRequest(uriSegment): Observable<any> {
        
        let passHeaders = this.headerData;
        if (uriSegment == "user/signup" || "user/loginwith/GMAIL") {
            passHeaders = this.headerDataWithReferer;
        }
        
        return this.http.get(this.baseUrl + uriSegment, { headers: passHeaders }).pipe(
            map(this.getRequestData),
            catchError(this.handleError)
        );
    }

    /**
     * Function is used to make POST request.
     * @param uriSegment,Mix,Last two segment of URL
     * @param data,json object,To send post data.
     * 
     * @return Json,Json Object,Data from server
     */
    makePostRequest(uriSegment, data) {
        
        let sendHeaders = this.headerData;
        if (uriSegment == "user/signup" || "user/loginwith/GMAIL" || "user/accept-invitation/:id") {
            sendHeaders = this.headerDataWithReferer;
        }

        return this.http.post(this.baseUrl + uriSegment, data, { headers: sendHeaders }).pipe(
            map(this.getRequestData),
            catchError(this.handleError)
        );
    }

    /**
     * Function is used to make API call for login request
     * 
     * @param uriSegment,Mix,last two segment of URL.
     * @param headers,Json Object, contains username or email and password
     * 
     * @return Json object,Json Object,containing error or success details. 
     */
    setRequestHeader(uriSegment, headers) {
        let headerData = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
            'X-SH-Source': 'WEB_APP',
            'Accept': 'application/json',
            'Authorization': "Basic " + headers

        });
        return this.http.get(this.baseUrl + uriSegment, { headers: headerData }).pipe(
            map(this.getRequestData),
            catchError(this.handleError)
        );
    }

    /**
     * Function is used to make API call for delete request
     * 
     * @param uriSegment 
     */
    makeDeleteRequest(uriSegment) {
        return this.http.delete(this.baseUrl + uriSegment, { headers: this.headerData }).pipe(
            map(this.getRequestData),
            catchError(this.handleError)
        );
    }

    getRequestData(res: Response) {
        return res || [];
    }

    handleError(error: HttpErrorResponse) {
        // return an observable with a user-facing error message
        return throwError(error);
        // return Observable.throw(error);
    }

    commonSnackBarMessage(msg, delay: number = 0) {
        let delay_set;
        if (delay != 0) {
            delay_set = delay;
        } else {
            delay_set = "3000";
        }
        let snackBarRef = this.snackBar.open(msg, '', {
            duration: delay_set
        });
        snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
        });
    }

    showNotification(type = "info", timer = 1000, error = null) {
        // const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "notifications",
            message: error,
            title: 'Error',

        }, {
                type: type,
                placement: {
                    from: "top",
                    align: "right"
                },
                timer: 1000,
                delay: 1000,
                allow_dismiss: true,
                newest_on_top: false,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                    '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                    '<i class="material-icons" data-notify="icon">notifications</i> ' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '</div>'
            });
    }

    setSpinner(value: boolean) {
        this.showSpinner.next(value);
    }

    // Overlay related code
    display(value: boolean) {
        this.status.next(value);
    }
}