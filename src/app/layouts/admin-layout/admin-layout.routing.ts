import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LogoutComponent } from '../../user/logout/logout.component';
import { ProductCategoryComponent } from '../../product-category/product-category.component';
import { ProductSubCategoryComponent } from '../../product-sub-category/product-sub-category.component';
import { AgeCategoryComponent } from '../../age-category/age-category.component';
import { ProductsComponent } from '../../products/products.component';
import { ProductCreateComponent } from '../../products/product-create/product-create.component';
import { ProductUpdateComponent } from '../../products/product-update/product-update.component';
import { ProductImagesComponent } from '../../products/product-images/product-images.component';
import { ContactusLeadsComponent } from '../../contactus-leads/contactus-leads.component';
import { OrderDetailComponent } from '../../order-detail/order-detail.component';

import { AuthGuard } from '../../guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    // { path: '',      component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'product-category', component: ProductCategoryComponent, canActivate: [AuthGuard] },
    { path: 'product-sub-category', component: ProductSubCategoryComponent, canActivate: [AuthGuard] },
    { path: 'age-category', component: AgeCategoryComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'product/create', component: ProductCreateComponent, canActivate: [AuthGuard] },
    { path: 'product/:id/update', component: ProductUpdateComponent, canActivate: [AuthGuard] },
    { path: 'product/:id/images', component: ProductImagesComponent, canActivate: [AuthGuard] },
    { path: 'order-details', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'contactus-leads', component: ContactusLeadsComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }
];
