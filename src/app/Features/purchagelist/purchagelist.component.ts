import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-purchagelist',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './purchagelist.component.html',
  styleUrl: './purchagelist.component.css'
})
export class PurchagelistComponent implements OnInit {
  ngOnInit(): void {
    this.loadPurchage();
  }
  purchageList:any[]=[];

  constructor(private http:HttpClient){

  }
  loadPurchage(){
    this.http.get("http://localhost:8080/inventory/purchase/fetchdata").subscribe((res:any)=>{
      console.log("API response:", res);
      this.purchageList=res;
    },error => {
      console.error("API error:", error);
    });
  }


}
