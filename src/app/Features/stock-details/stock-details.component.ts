import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule,FormsModule,DatePipe],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})
export class StockDetailsComponent implements OnInit {
 
 
 allStock:any[]=[];
 constructor(private http:HttpClient){

 }
  ngOnInit(): void {
    this.getAllStocks();
 }
 getAllStocks(){
  this.http.get("http://localhost:8080/inventory/product/fetchprodut").subscribe((res:any)=>{
    this.allStock=res;
    console.log(res);
  },error=>{
    alert("there is an error in getting the all stock");
    console.log(error);
  })
 }

}
