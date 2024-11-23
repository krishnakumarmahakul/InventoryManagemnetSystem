import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-accountdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accountdetails.component.html',
  styleUrl: './accountdetails.component.css'
})
export class AccountdetailsComponent {
  userData: any = null;
  
  constructor(private router:Router){

  }

  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    this.userData = user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigateByUrl('/login'); // Redirect to login or other route
  }
}
