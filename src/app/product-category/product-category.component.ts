import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CommonService } from '../shared/common.service';
import { GridService } from '../shared/grid.service';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        private activated_route: ActivatedRoute,
        private grid_service: GridService,
        private common_service: CommonService,
        private bottomSheet: MatBottomSheet
    ) { }

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
    default_url: string = "product/category?";
    show_spinner: boolean = true;
    i_class: string = "";
    current_col: string;
    search_key_word: string;
    page_from: number;
    page_to: number;

    ngOnInit() {
        let setUrl: string;
        let params = this.activated_route.snapshot.params;
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
            setUrl = this.default_url + query_params_array.join("&");
        } else {
            if (this.search_key_word != null && this.search_key_word != "") {
                query_params_array.push("query=" + encodeURIComponent(this.search_key_word));
            }
            if (this.cur_page != null) {
                query_params_array.push("page=" + this.cur_page);
            }

            query_params_array.push("order_by=" + this.order_by);
            query_params_array.push("order=" + this.order);

            setUrl = this.default_url + query_params_array.join("&");
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

    updateProductCategory(id) {
        let dialogRef_update = this.dialog.open(UpdateProductCategoryDialog, {
            width: '250px',
            data: {
                id: id
            }
        });

        dialogRef_update.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(AddProductCategoryDialog, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ngOnInit();
            }
        });
    }

    deleteProductCategory(id) {
        const bottomSheetRef = this.bottomSheet.open(BottomSheetOverviewDeletePopup, {
            data: {
                id: id
            }
        });
        bottomSheetRef.afterDismissed().subscribe((result) => {
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
            service.makePostRequest("product/"+id+"/category-status-update", data_update)
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

}

@Component({
    selector: 'add-product-category-dialog',
    templateUrl: 'add-product-category-dialog.html',
})
export class AddProductCategoryDialog {

    product_cat_add: FormGroup;
    product_category: FormControl;

    constructor(
        public dialogRef: MatDialogRef<AddProductCategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common_service: CommonService
    ) { }

    ngOnInit() {
        this.product_category = new FormControl('', [
            Validators.required
        ]);
        this.product_cat_add = new FormGroup({
            product_category: this.product_category
        });
    }

    onNoClick(val): void {
        this.dialogRef.close(val);
    }

    addProductCategory(form) {
        if (form.valid) {
            let data_add = {
                product_category: form.value.product_category
            };
            let this_obj = this;
            let service = this.common_service;
            return new Promise(function (resolve, reject) {
                service.makePostRequest("product/add-category", data_add)
                    .subscribe(
                        (response) => {
                            this_obj.onNoClick(true);
                        },
                        (error) => {
                            this_obj.onNoClick(false);
                            console.log(error);
                            let error_data = error.json();
                        }
                    )
            });
        }
    }

}

@Component({
    selector: 'update-product-category-dialog',
    templateUrl: 'update-product-category-dialog.html',
})
export class UpdateProductCategoryDialog {

    product_cat_add: FormGroup;
    product_category: FormControl;

    constructor(
        public dialogRef: MatDialogRef<UpdateProductCategoryDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common_service: CommonService
    ) { }

    ngOnInit() {
        this.product_category = new FormControl('', [
            Validators.required
        ]);
        this.product_cat_add = new FormGroup({
            product_category: this.product_category
        });

        let this_obj = this;
        let pro_cat_id = this.data.id;
        let service = this.common_service;
        return new Promise(function (resolve, reject) {
            service.makeGetRequest("product/" + pro_cat_id + "/category-view")
                .subscribe(
                    (response) => {
                        this_obj.product_cat_add.patchValue({
                            "product_category": response.category_name
                        });
                    },
                    (error) => {
                        this_obj.onNoClick(false);
                        console.log(error);
                        let error_data = error.json();
                    }
                )
        });
    }

    onNoClick(val): void {
        this.dialogRef.close(val);
    }

    updateProductCategory(form) {
        if (form.valid) {
            let data_add = {
                product_category: form.value.product_category
            };
            let this_obj = this;
            let pro_cat_id = this.data.id;
            let service = this.common_service;
            return new Promise(function (resolve, reject) {
                service.makePostRequest("product/" + pro_cat_id + "/category-update", data_add)
                    .subscribe(
                        (response) => {
                            this_obj.onNoClick(true);
                        },
                        (error) => {
                            this_obj.onNoClick(false);
                            console.log(error);
                            let error_data = error.json();
                        }
                    )
            });
        }
    }

}

@Component({
    selector: 'bottom-sheet-overview-delete-popup',
    templateUrl: 'bottom-sheet-overview-delete-popup.html',
})
export class BottomSheetOverviewDeletePopup {
    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewDeletePopup>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private common_service: CommonService) { }

    deleteProductCategory() {
        this.common_service.makeDeleteRequest("product/" + this.data.id + "/category-delete")
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