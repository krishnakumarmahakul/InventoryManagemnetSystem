import { Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { LayoutComponent } from './Home/layout/layout.component';
import { DashbordComponent } from './Features/dashbord/dashbord.component';
import { Component } from '@angular/core';
import { AccountdetailsComponent } from './Features/accountdetails/accountdetails.component';
import { NewpurchageComponent } from './Features/newpurchage/newpurchage.component';
import { NewsaleComponent } from './Features/newsale/newsale.component';
import { ProductcatagoryComponent } from './Features/productcatagory/productcatagory.component';
import { PurchagelistComponent } from './Features/purchagelist/purchagelist.component';
import { SalelistComponent } from './Features/salelist/salelist.component';
import { StockDetailsComponent } from './Features/stock-details/stock-details.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashbordComponent
                
            },
            {
                path:'accountdetails',
                component:AccountdetailsComponent
            },
            {
                path:'newpurchase',
                component:NewpurchageComponent
            },
            {
                path:'newsale',
                component:NewsaleComponent
            },
            {
                path:'productcatagory',
                component:ProductcatagoryComponent
            },
            {
                path:'purchaselist',
                component:PurchagelistComponent
            },
            {
                path:'salelist',
                component:SalelistComponent
            },
            {
                path:'stockdetails',
                component:StockDetailsComponent
            },
            { path: '**',
            redirectTo:'/dashboard'
            }
        ]
    }
    ,
];
