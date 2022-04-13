import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { FormGroup, NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Res } from '../../models/res.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent implements OnInit {
  loginForm:any;

  constructor(
    private service: ServiceAPIService,
    private fb: FormBuilder,
    private ruta: Router
  ) {}


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
