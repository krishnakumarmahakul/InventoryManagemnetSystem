import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-newsale',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe,RouterOutlet,RouterLink],
  templateUrl: './newsale.component.html',
  styleUrl: './newsale.component.css'
})
export class NewsaleComponent implements OnInit{
   salesObj:any={
    "saleId": null,
    "invoiceNo": null,
    "customerName": null,
    "mobileNo": null,
    "saleDate": null,
    "productId": null,
    "quantity": null,
    "totalAmount": null
  }
  productList:any[]=[];
  selectedProductQuantity: number = 0;
  constructor(private http:HttpClient){
 
  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  plist:any={}

  getAllProduct(){
   this.http.get("http://localhost:8080/inventory/product/fetchprodut").subscribe((res:any)=>{
     this.productList=res;
     this.plist=res;
   },error => {
     console.error("API error:", error);
   })
  }

  onBuy(){
   
    if (this.salesObj.invoiceNo && this.salesObj.customerName && this.salesObj.mobileNo && this.salesObj.saleDate && this.salesObj.productId && this.salesObj.quantity && this.salesObj.totalAmount){

      this.http.post("http://localhost:8080/inventory/newsale/addsale",this.salesObj).subscribe(data=>{
        alert("Susceessfully make a sale");
        var selectedProduct = this.plist.find((product: { id: any; }) => product.id == this.salesObj.productId);
        if (selectedProduct) {
          this.selectedProductQuantity = selectedProduct.quantity;
          console.log("Selected Product Quantity:", this.selectedProductQuantity);
          } else {
            console.log("Product not found with ID:", this.salesObj.productId);
          }

          const updatedQuantity = this.selectedProductQuantity - this.salesObj.quantity;
          console.log(updatedQuantity)
          this.updateProductQuantity(this.salesObj.productId, updatedQuantity);
          console.log(this.salesObj.productId)
        },error=>{
          console.log("Error is",error);
        });
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
