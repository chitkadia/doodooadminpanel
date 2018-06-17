import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/product-category', title: 'Product Category',  icon:'person', class: '' },
    { path: '/product-sub-category', title: 'Product Sub Category',  icon:'content_paste', class: '' },
    { path: '/age-category', title: 'Age Category',  icon:'library_books', class: '' },
    { path: '/products', title: 'Products',  icon:'bubble_chart', class: '' },
    { path: '/order-details', title: 'Orders',  icon:'location_on', class: '' },
    { path: '/contactus-leads', title: 'ContactUs Leads',  icon:'location_on', class: '' },
    { path: '/logout', title: 'Logout',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
