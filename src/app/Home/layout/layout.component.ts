import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashbordComponent } from "../../Features/dashbord/dashbord.component";
import { CommonModule } from '@angular/common';
import { NewpurchageComponent } from "../../Features/newpurchage/newpurchage.component";
import { NewsaleComponent } from "../../Features/newsale/newsale.component";
import { ProductcatagoryComponent } from "../../Features/productcatagory/productcatagory.component";
import { PurchagelistComponent } from "../../Features/purchagelist/purchagelist.component";
import { SalelistComponent } from "../../Features/salelist/salelist.component";
import { StockDetailsComponent } from "../../Features/stock-details/stock-details.component";
import { AccountdetailsComponent } from "../../Features/accountdetails/accountdetails.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout', 
  standalone: true,
  imports: [RouterOutlet, RouterLink, DashbordComponent, CommonModule, NewpurchageComponent, NewsaleComponent, ProductcatagoryComponent, PurchagelistComponent, SalelistComponent, StockDetailsComponent, AccountdetailsComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent  {
  totalInventory: number = 0;
  totalProducts: number=0;
  totalSale: number=0;
  totalpurchase :number=0;
  plist:any={

  }

  productList:any[]=[]
  saleList:any []=[]
  purchageList:any []=[]

  ngOnInit(): void {
    this.getProductdata();
    this.getSaledata();
    this.getPurchsedata();
  }
  constructor (private http:HttpClient){

  }
  
  getProductdata(){
    this.http.get("http://localhost:8080/inventory/product/fetchprodut").subscribe((res:any)=>{
      this.productList =res;
      this.plist=res;
      this.calculateTotalInventory();
        this.calculateTotalProducts();
      console.log(res);
      // debugger
      
    },error => {
      console.error("API error:", error);
    })
  }

  getSaledata(){
    this.http.get("http://localhost:8080/inventory/newsale/getsale").subscribe((res:any)=>{
      this.saleList=res;
      this.calculateTotalSale()
      console.log(res);
    },error => {
      console.error("API error:", error);
    });
  }

  getPurchsedata(){
    this.http.get("http://localhost:8080/inventory/purchase/fetchdata").subscribe((res:any)=>{
      console.log("API response:", res);
      this.purchageList=res;
      this.calculateTotalpurchase();
    },error => {
      console.error("API error:", error);
    });
  }
  
  calculateTotalSale() {
    this.totalSale = this.saleList.reduce((sum, sale) => sum + sale.quantity, 0);
  }

  calculateTotalInventory() {
    this.totalInventory = this.productList.reduce((sum, product) => sum + product.quantity, 0);
  }

  calculateTotalProducts() {
    this.totalProducts = this.productList.length; // Count the total number of products
  }
  
  calculateTotalpurchase(){
    this.totalpurchase =this.purchageList.reduce((sum, purchase)=>sum + purchase.quantity,0)
  }
}
