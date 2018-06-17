import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { NgProgress } from 'ngx-progressbar';

import { CommonService } from './common.service';

@Injectable()
export class GridService {

    constructor(private commonService: CommonService, private router: Router) { }

    rows: Array<any>; // data to show in grid
    pagination: number; // Get total page number
    range: number; // Range to get the total page array
    cur_page: number = 1; // Current Page Number
    page_number: number; // Pager Number
    page_size: number; // Page Size
    total_records: number; // Total Records

    SortingBy: string = "DESC";
    OrderBy: string = "id";

    iClass: string = "";
    current_col: string;

    selectedValue: number = 10;

    GridDataReturn: any;

    mainQueryString: string;

    current_url: string;

    user_info_data = {};
    user_plan_info_data = {};

    /**
     * Used to set data values
     * 
     * Used to set the row data for display purpose
     * Set pagination value
     * Set range value
     * Set total records
     * 
     */
    setGridData(uriSegment) {
        let this_obj= this;
        let common_service = this.commonService;
        //let progress_bar = this.progress;
        common_service.setSpinner(true);
        return new Promise(function (resolve, reject) {
            common_service.makeGetRequest(uriSegment)
                .subscribe(
                (res) => {
                    resolve(res);
                   // progress_bar.done();
                    common_service.display(false);
                },
                (error) => {
                    reject(error);
                    let error_data = error;
                    console.log(error);
                    // error_box.openDialog(error_data.error_code, error_data.error_message, error_data.error_code + " - " + error_data.error_message);
                }
                )
            common_service.setSpinner(false);
        });
    }

    /**
     * Used to get data
     */
    getGridData() {
        this.GridDataReturn = {
            rows: this.rows,
            pagination: this.pagination,
            range: this.range,
            total_records: this.total_records,
            current_url: this.current_url,
            SortingBy: this.SortingBy,
            OrderBy: this.OrderBy,
            iClass: this.iClass,
            current_col: this.current_col,
            page_size: this.page_size,
            cur_page: this.cur_page
        }
        return this.GridDataReturn;
    }

    /**
     * 
     * @param sortcolumn 
     * @param sortingby 
     * 
     * Used to sort the data based on the field
     */
    sortingThis(sortcolumn, sortingby, extraParameter: string = '') {
        if (sortingby === 'ASC') {
            this.setGridData(this.current_url + "?page=1&per_page=" + this.page_size + "&order_by=" + sortcolumn + "&order=DESC" + extraParameter);
            this.SortingBy = "DESC";
            this.OrderBy = sortcolumn + " DESC";
            this.iClass = "fa fa-sort-desc";
            this.current_col = sortcolumn;
        } else {
            this.setGridData(this.current_url + "?page=1&per_page=" + this.page_size + "&order_by=" + sortcolumn + "&order=ASC" + extraParameter);
            this.SortingBy = "ASC";
            this.OrderBy = sortcolumn + " ASC";
            this.iClass = "fa fa-sort-asc";
            this.current_col = sortcolumn;
        }
    }

    // Used to set the selected page size
    setPageSize(selectedValue) {
        this.page_size = selectedValue;
        this.cur_page = 1;
    }

    // Used ti set the current page
    setCurrentPage(current_page) {
        this.cur_page = current_page;
    }

    //Destroy all the variables
    destroyThisVariable() {
        this.rows = [];
        this.pagination = 0;
        this.range = 0;
        this.cur_page = 1;
        this.page_number = 1;
        this.page_size = 10;
        this.total_records = 0;
        this.SortingBy = "DESC";
        this.OrderBy = "id";
        this.iClass = "fa fa-sort-desc";
        this.current_col = "";
        this.selectedValue = 10;
        this.GridDataReturn = [];
        this.mainQueryString = "";
        this.current_url = "";
    }
}
