import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    constructor(
        private common_service: CommonService,
        private router: Router
    ) { }

    product_add: FormGroup;
    product_category_id: FormControl;
    product_sub_category_id: FormControl;
    age_group: FormControl;
    product_name: FormControl;
    product_short_description: FormControl;
    product_description: FormControl;
    product_price: FormControl;
    product_amazon_link: FormControl;

    categories: any;
    sub_categories: any;
    age_group_cat: any;

    ngOnInit() {
        this.product_category_id = new FormControl('', [
            Validators.required
        ]);
        this.product_sub_category_id = new FormControl('', [
            Validators.required
        ]);
        this.age_group = new FormControl('', [
            Validators.required
        ]);
        this.product_name = new FormControl('', [
            Validators.required
        ]);
        this.product_short_description = new FormControl('', [
            Validators.required
        ]);
        this.product_description = new FormControl('', [
            Validators.required
        ]);
        this.product_price = new FormControl('', [
            Validators.required
        ]);
        this.product_amazon_link = new FormControl('', [
            Validators.required
        ]);
        this.product_add = new FormGroup({
            product_category_id: this.product_category_id,
            product_sub_category_id: this.product_sub_category_id,
            age_group: this.age_group,
            product_name: this.product_name,
            product_short_description: this.product_short_description,
            product_description: this.product_description,
            product_price: this.product_price,
            product_amazon_link: this.product_amazon_link
        });

        this.common_service.makeGetRequest("product/category/list")
            .subscribe(
                (response) => {
                    this.categories = response;
                },
                (error) => {
                    console.log(error);
                    let error_data = error.json();
                }
            );

        // this.common_service.makeGetRequest("product/sub-category/list")
        // .subscribe(
        //     (response) => {
        //         this.sub_categories = response;
        //     },
        //     (error) => {
        //         console.log(error);
        //         let error_data = error.json();
        //     }
        // );

        this.common_service.makeGetRequest("product/age-group/list")
            .subscribe(
                (response) => {
                    this.age_group_cat = response;
                },
                (error) => {
                    console.log(error);
                    let error_data = error.json();
                }
            );
    }

    getSubCategory(event) {
        this.common_service.makeGetRequest("product/" + event.value + "/sub-category/list")
            .subscribe(
                (response) => {
                    this.sub_categories = response;
                    this.product_add.patchValue({
                        "product_sub_category_id": ""
                    });
                },
                (error) => {
                    console.log(error);
                    let error_data = error.json();
                }
            );
    }

    addProductDetails(form) {
        if (form.valid) {
            let data_add = {
                product_category_id: form.value.product_category_id,
                product_sub_category_id: form.value.product_sub_category_id,
                age_group: form.value.age_group,
                product_name: form.value.product_name,
                product_short_description: form.value.product_short_description,
                product_description: form.value.product_description,
                product_price: form.value.product_price,
                product_amazon_link: form.value.product_amazon_link
            };
            let this_obj = this;
            let service = this.common_service;
            return new Promise(function (resolve, reject) {
                service.makePostRequest("product/create", data_add)
                    .subscribe(
                        (response) => {
                            this_obj.router.navigate([
                                "/products"
                            ]);
                        },
                        (error) => {
                            console.log(error);
                            let error_data = error.json();
                        }
                    )
            });
        }
    }

}
