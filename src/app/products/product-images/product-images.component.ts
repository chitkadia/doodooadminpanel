import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { CommonService } from '../../shared/common.service';
import { GridService } from '../../shared/grid.service';

import { environment } from '../../../environments/environment';

import { SanitizeHtmlPipe } from '../../shared/sanitize-html.pipe';

const URL = environment.fileUploadUrl;

@Component({
    selector: 'app-product-images',
    templateUrl: './product-images.component.html',
    styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private activated_route: ActivatedRoute,
        private common_service: CommonService,
        private grid_service: GridService,
        private bottomSheet: MatBottomSheet
    ) { }

    product_id: any;

    rows: Array<any>;
    cur_page: number;
    page_size: number;
    total_pages: number;
    total_records: number;
    range: number;
    pageSize = 25;
    order_by: string = "id";
    order: string = "desc";
    site_name = environment.site_name_title;
    selectedValue = environment.selectedValue;
    default_url: string = "product/image-list?";
    show_spinner: boolean = true;
    i_class: string = "";
    current_col: string;
    search_key_word: string;
    page_from: number;
    page_to: number;

    ngOnInit() {
        let params = this.activated_route.snapshot.params;
        this.product_id = params.id;
        let setUrl: string;
        let query_params_array = [];

        if (Object.keys(params).length > 0) {
            let order_by_val: string;
            let order_val: string;
            let search_string: string;

            if (params.order_by != null && params.order_by != "") {
                order_by_val = params.order_by;
            } else {
                order_by_val = this.order_by;
            }

            if (params.order != null && params.order != "") {
                order_val = params.order;
            } else {
                order_val = this.order;
            }

            query_params_array.push("order_by=" + order_by_val);
            query_params_array.push("order=" + order_val);

            if (params.query != null && params.query != "") {
                query_params_array.push("query=" + encodeURIComponent(params.query));
            }

            if (params.page != null && params.page != "") {
                query_params_array.push("page=" + params.page);
            }

            if (params.per_page != null && params.per_page != "") {
                query_params_array.push("per_page=" + params.per_page);
            }
            setUrl = "product/"+this.product_id+"/image-list?" + query_params_array.join("&");
        } else {
            if (this.search_key_word != null && this.search_key_word != "") {
                query_params_array.push("query=" + encodeURIComponent(this.search_key_word));
            }
            if (this.cur_page != null) {
                query_params_array.push("page=" + this.cur_page);
            }

            query_params_array.push("order_by=" + this.order_by);
            query_params_array.push("order=" + this.order);

            setUrl = "product/"+this.product_id+"/image-list?" + query_params_array.join("&");
        }

        let _request_list = this.grid_service.setGridData(setUrl);
        _request_list.then((success: any) => {
            if (params.order == "DESC") {
                this.i_class = "fa fa-sort-desc";
            } else {
                this.i_class = "fa fa-sort-asc";
            }

            this.rows = success.rows;
            this.cur_page = success.current_page;
            this.page_size = success.per_page;
            this.total_pages = success.total_pages;
            this.total_records = success.total_records;
            this.selectedValue = parseInt(success.per_page);
            this.common_service.showSpinner.subscribe((val: boolean) => {
                this.show_spinner = val;
            });
        });
    }

    openDialog() {
        let dialogRef = this.dialog.open(AddProductImageDialog, {
            width: 'auto',
            data: {
                product_id: this.product_id,
                image_id: null
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    openUpdateDialog(id) {
        let dialogRef = this.dialog.open(AddProductImageDialog, {
            width: 'auto',
            data: {
                product_id: this.product_id,
                image_id: id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    updateStatus(status, id) {
        let status_val;
        if (status == 'STATUS_ACTIVE') {
            status_val = 'STATUS_INACTIVE';
        } else {
            status_val = 'STATUS_ACTIVE';
        }
        let data_update = {
            status: status_val
        };
        let this_obj = this;
        let service = this.common_service;
        return new Promise(function (resolve, reject) {
            service.makePostRequest("product/"+this_obj.product_id+"/"+id+"/image-status-update", data_update)
                .subscribe(
                    (response: any) => {
                        this_obj.common_service.commonSnackBarMessage(response.message);
                        this_obj.ngOnInit();
                    },
                    (error) => {
                        console.log(error);
                        let error_data = error.json();
                    }
                )
        });
    }

    updateDefault(id) {
        let data_update = {};
        let this_obj = this;
        let service = this.common_service;
        return new Promise(function (resolve, reject) {
            service.makePostRequest("product/"+this_obj.product_id+"/"+id+"/image-default-update", data_update)
                .subscribe(
                    (response: any) => {
                        this_obj.common_service.commonSnackBarMessage(response.message);
                        this_obj.ngOnInit();
                    },
                    (error) => {
                        console.log(error);
                        let error_data = error.json();
                    }
                )
        });
    }

    deleteImage(id) {
        const bottomSheetRef = this.bottomSheet.open(BottomSheetOverviewImgDeletePopup, {
            data: {
                id: id,
                product_id: this.product_id
            }
        });
        bottomSheetRef.afterDismissed().subscribe((result) => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

}

@Component({
    selector: 'add-product-image-dialog',
    templateUrl: 'add-product-image-dialog.html',
})
export class AddProductImageDialog {

    constructor(
        public dialogRef: MatDialogRef<AddProductImageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common_service: CommonService
    ) { }

    product_cat_add: FormGroup;
    product_category: FormControl;

    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false; 
    public is_show_progressbar:boolean = false;
    public upload_url: any = this.data.image_id == null ? environment.api_endpoint+'product/'+this.data.product_id+'/image-upload' : environment.api_endpoint+'product/'+this.data.product_id+'/'+this.data.image_id+'/image-upload'

    public uploader: FileUploader = new FileUploader({
        url: this.upload_url,
        headers: [
            //{name:'Content-Type', value:'multipart/form-data'},
            {name:'Accept', value:'application/json'},
            {name:'X-SH-Source', value:'WEB_APP'},
            {name:'X-Authorization-Token', value : localStorage.getItem("X-Auth-Token")},
        ],
        itemAlias: 'file'
    });

    ngOnInit() {
        this.uploader;
        this.disableWithCredentials();
        // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //     console.log('ImageUpload:uploaded:', item, status, response);
        //     // alert('File uploaded successfully');
        // };
    }

    fileOverBase(e: any): void {

        this.hasBaseDropZoneOver = e;
        this.uploader.uploadAll();
        if (this.uploader.isUploading) {
            this.is_show_progressbar = true;
        }
        // If uploading is completed,hide progressbar
        this.uploader.onCompleteAll = () => {
            this.is_show_progressbar = false;
            this.onNoClick(true);
            this.common_service.commonSnackBarMessage("Image Uploaded Successfully");
        };
    }

    onNoClick(val): void {
        this.dialogRef.close(val);
    }

    disableWithCredentials() {
        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        }
    }

}

@Component({
    selector: 'bottom-sheet-overview-img-delete-popup',
    templateUrl: 'bottom-sheet-overview-img-delete-popup.html',
})
export class BottomSheetOverviewImgDeletePopup {
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewImgDeletePopup>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private common_service: CommonService) { }

        deleteImage() {
        this.common_service.makeDeleteRequest("product/" + this.data.product_id + "/" + this.data.id + "/image-delete")
            .subscribe(
                (res: any) => {
                    this.common_service.commonSnackBarMessage(res.message);
                    this.closeBottomSheet(true);
                },
                (error) => {
                    this.closeBottomSheet(false);
                    let error_data = error.json();
                    // this.errorBox.openDialog(error_data.error_code, error_data.error_message, error_data.error_code + " - " + error_data.error_message);
                }
            );
    }

    closeBottomSheet(val) {
        this.bottomSheetRef.dismiss(val);
    }
}