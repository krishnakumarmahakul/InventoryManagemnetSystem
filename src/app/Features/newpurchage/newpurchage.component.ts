import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-newpurchage',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe,RouterLink,RouterOutlet],
  templateUrl: './newpurchage.component.html',
  styleUrl: './newpurchage.component.css'
})
export class NewpurchageComponent implements OnInit{

 purchaseObj:any={
  "purchaseId":null,
  "purchaseDate": "2024-10-26T13:04:44.934Z",
  "productId":null,
  "quantity": 0,
  "supplierName": null,
  "invoiceAmount": 0,
  "invoiceNo": 0
};
selectedProductQuantity: number = 0;

 productList:any[]=[];

 constructor(private http:HttpClient){

 }
 ngOnInit(): void {
     this.getAllProduct();
 }
 plist:any={

 }
 getAllProduct(){
  this.http.get("http://localhost:8080/inventory/product/fetchprodut").subscribe((res:any)=>{
    this.productList=res;
    this.plist=res;
    console.log(res);
    // debugger
    
  },error => {
    console.error("API error:", error);
  })
 }
 
 

    onSave(){
      if(this.purchaseObj.purchaseDate && this.purchaseObj.productId && this.purchaseObj.quantity && this.purchaseObj.supplierName && this.purchaseObj.invoiceAmount && this.purchaseObj.invoiceNo){
        this.http.post("http://localhost:8080/inventory/purchase/adddata",this.purchaseObj).subscribe(data =>{
          alert("Data added sucessfuly")
          var selectedProduct = this.plist.find((product: { id: any; }) => product.id == this.purchaseObj.productId);
        if (selectedProduct) {
          console.log(selectedProduct)
          this.selectedProductQuantity = selectedProduct.quantity;
        }

          const updatedQuantity = this.selectedProductQuantity + this.purchaseObj.quantity;
          console.log(updatedQuantity)
          this.updateProductQuantity(this.purchaseObj.productId, updatedQuantity);
          console.log(this.purchaseObj.productId)

        },error=>alert("Unable to add"));
      }else{
        alert("Fill all the details")
      }
    }


    updateProductQuantity(productId: number, updatedQuantity: number) {
      console.log(productId)
      this.http.put("http://localhost:8080/inventory/product/updatequantity", {
        productId: productId,
        quantity: updatedQuantity
      }).subscribe(response => {
        console.log("Product quantity updated successfully:", response);
      }, error => {
        console.error("Error updating product quantity:", error);
      });
    }
}
