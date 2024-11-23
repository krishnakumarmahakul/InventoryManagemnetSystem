import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  totalInventory: number = 0;
  totalProducts: number=0;
  totalSale: number=0;

  recentActivities = [
    { description: 'Sale of Product A', date: '2024-10-30' },
    { description: 'Purchase of Product B', date: '2024-10-29' }
  ];
  restockRequirements: number = 10;

  plist:any={

  }

  productList:any[]=[]
  saleList:any []=[]

  ngOnInit(): void {
    this.getProductdata();
    this.getSaledata();
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
  
  calculateTotalSale() {
    this.totalSale = this.saleList.reduce((sum, sale) => sum + sale.quantity, 0);
  }

  calculateTotalInventory() {
    this.totalInventory = this.productList.reduce((sum, product) => sum + product.quantity, 0);
  }

  calculateTotalProducts() {
    this.totalProducts = this.productList.length; // Count the total number of products
  }
}
