import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-productcatagory',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './productcatagory.component.html',
  styleUrl: './productcatagory.component.css'
})
export class ProductcatagoryComponent {
  divs: { id: number, category: string }[] = [];  
  count = 0;
  today: number = Date.now();
  
  productobj:any={
    "productname":null,
    "quantity":0
  }

  constructor(private http:HttpClient){

  }
  
  
  addDiv() {
    if(this.productobj.productname){
      this.http.post("http://localhost:8080/inventory/product/addproduct",this.productobj).subscribe(data => {
        alert("Product added succesfully")
        this.count++;
        this.divs.push({ id: this.count, category: this.productobj.productname });
        this.addproducttoggle=!this.addproducttoggle;
      },error=>{
        alert("Somthing went wrong")
      });
    }else{
      alert("Enter the product name ")
    }
    

  }
  removeDiv(index: number) {
    this.divs.splice(index, 1);
  } 
  
  
  addproducttoggle:boolean=false;
  onadding(){
     this.addproducttoggle=!this.addproducttoggle;
     
  }
  
}