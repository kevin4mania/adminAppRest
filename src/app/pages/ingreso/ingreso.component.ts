import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Res } from '../../models/res.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent implements OnInit {
  hide = true;

  // email: string = '';
  // password: String = '';
  // email2 = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private service: ServiceAPIService,
    private fb: FormBuilder,
    private ruta: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required]], //, Validators.email
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  // login(form: NgForm) {
  //   // console.log("VALOR-FORMULARIO-->",form.value);
  //   this.service.serviceLogin(form.value).subscribe((res: Res) => {
  //     console.log('Res-->', res);
  //     console.log(`ERROR->${res.ok}`);
  //     console.log(`MSG->${res.msg}`);
  //   });
  // }
  getErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'campo obligatorio';
    } else if (this.loginForm.get('email')?.hasError('required')) {
      return 'campo obligatorio';
    }

    return '';
    /*
    return this.loginForm.get('email')?.hasError('email')
      ? 'Not a valid email NNNN'
      : '';
      */
  }

  login() {
    // const template_Title =this.loginForm.get('email')?.value;
    // const template_Title =this.loginForm.get('email')?.value;
    // const pass =this.loginForm.get('password')?.value;
    // console.log(template_Title,":",pass);
    // console.log(this.loginForm.value);
    this.service.serviceLogin(this.loginForm.value).subscribe((res: any) => {
        console.log('Res-->', res);
        console.log(`ERROR->${res.ok}`);
        console.log(`MSG->${res.msg}`);
        if(res.ok && res.codError=="0001"){
          localStorage.setItem('x-token', res.token);
          this.ruta.navigate(['/usuario'])
        }
      }
    );
  }
}
