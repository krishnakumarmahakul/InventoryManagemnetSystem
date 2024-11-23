import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-salelist',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './salelist.component.html',
  styleUrl: './salelist.component.css'
})
export class SalelistComponent implements OnInit {

  ngOnInit(): void {
    this.loadPurchage();
  }
  saleList:any[]=[];

  constructor(private http:HttpClient){
    
  }
  loadPurchage(){

    this.http.get("http://localhost:8080/inventory/newsale/getsale").subscribe((res:any)=>{
      this.saleList=res;
      console.log(res);
    },error => {
      console.error("API error:", error);
    });
  }

}
