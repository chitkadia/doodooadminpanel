import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProductCategoryComponent, AddProductCategoryDialog, UpdateProductCategoryDialog, BottomSheetOverviewDeletePopup } from '../../product-category/product-category.component';
import { ProductSubCategoryComponent, AddProductSubCategoryDialog, UpdateProductSubCategoryDialog, BottomSheetOverviewSubDeletePopup } from '../../product-sub-category/product-sub-category.component';
import { AgeCategoryComponent, AddAgeCategoryDialog, UpdateAgeCategoryDialog, BottomSheetOverviewAgeDeletePopup } from '../../age-category/age-category.component';
import { ProductsComponent, ViewSubCategory, BottomSheetOverviewProDeletePopup } from '../../products/products.component';
import { ProductCreateComponent } from '../../products/product-create/product-create.component';
import { ProductUpdateComponent } from '../../products/product-update/product-update.component';
import { ProductImagesComponent, AddProductImageDialog, BottomSheetOverviewImgDeletePopup } from '../../products/product-images/product-images.component';
import { ContactusLeadsComponent } from '../../contactus-leads/contactus-leads.component';
import { LogoutComponent } from '../../user/logout/logout.component';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatBottomSheetModule,
        MatListModule,
        MatSelectModule,
        QuillModule,
        SharedModule,
        FileUploadModule
    ],
    declarations: [
        DashboardComponent,
        ProductCategoryComponent,
        LogoutComponent,
        AddProductCategoryDialog,
        UpdateProductCategoryDialog,
        BottomSheetOverviewDeletePopup,
        AddProductSubCategoryDialog,
        UpdateProductSubCategoryDialog,
        BottomSheetOverviewSubDeletePopup,
        ProductSubCategoryComponent,
        AgeCategoryComponent,
        AddAgeCategoryDialog,
        UpdateAgeCategoryDialog,
        BottomSheetOverviewAgeDeletePopup,
        ProductsComponent,
        ProductCreateComponent,
        ViewSubCategory,
        BottomSheetOverviewProDeletePopup,
        ProductUpdateComponent,
        ProductImagesComponent,
        // FileSelectDirective,
        AddProductImageDialog,
        BottomSheetOverviewImgDeletePopup,
        ContactusLeadsComponent,
        OrderDetailComponent
    ],
    entryComponents: [
        AddProductCategoryDialog,
        UpdateProductCategoryDialog,
        BottomSheetOverviewDeletePopup,
        AddProductSubCategoryDialog,
        UpdateProductSubCategoryDialog,
        BottomSheetOverviewSubDeletePopup,
        AddAgeCategoryDialog,
        UpdateAgeCategoryDialog,
        BottomSheetOverviewAgeDeletePopup,
        ViewSubCategory,
        BottomSheetOverviewProDeletePopup,
        AddProductImageDialog,
        BottomSheetOverviewImgDeletePopup
    ]
})

export class AdminLayoutModule { }
