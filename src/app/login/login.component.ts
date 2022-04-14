import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../services/service-api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  
  constructor(
    private service: ServiceAPIService,
    private ruta: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  login() {
    this.service.serviceLogin(this.loginForm.value).subscribe((res: any) => {
        if(res.ok && res.codError=="0001"){
          localStorage.setItem('x-token', res.token);
          localStorage.setItem('idUser', res.usuario.id);
          this.ruta.navigate(['/usuario'])
        } else {
        this.alertErrorMessage(res.msg);
        }
      }, err => {
        this.alertErrorMessage(err.error);
      }
    );
  }

  alertErrorMessage(mensaje:any){
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
   }

}
