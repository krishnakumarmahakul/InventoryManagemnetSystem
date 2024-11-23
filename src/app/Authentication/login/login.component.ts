import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  regObj:any={
    "username":null,
    "email":null,
    "phone":null,
    "password":null
  }

  loginObj:any={
    "username": "",
    "password": ""
  };

  log:any={
    
  }

  http=inject(HttpClient);
  constructor(private router:Router){

  }
  Reg(){
    if (this.regObj.username && this.regObj.email && this.regObj.phone && this.regObj.password) {
      this.http.post("http://localhost:8080/inventory/auth/reg",this.regObj).subscribe(data =>{
        alert("Registration Sucessfully!!!")
      },error=>{
        alert("Server not avialable")
      });
    }else{
      alert("Please enter all the details")
    }
  }
  
  onLogin(){
    this.http.get("http://localhost:8080/inventory/auth/login").subscribe((res:any)=>{
      this.log=res
      console.log(res)
      // debugger
      const exituser=this.log.find((user: { username: any; password: any; }) => user.username==this.loginObj.username && user.password==this.loginObj.password)
      if(exituser!=undefined){
        localStorage.setItem('loggedInUser', JSON.stringify(exituser)); // Store user data in localStorage
        this.router.navigateByUrl('/accountdetails');

      }else{
        alert("you choosen wrong email or password");

      }
    })

  } 
    
  
}
