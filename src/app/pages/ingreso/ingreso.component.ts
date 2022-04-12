import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.sass'],
})
export class IngresoComponent implements OnInit {

  email:string="";
  password:String="";
  constructor(private service: ServiceAPIService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    // console.log("VALOR-FORMULARIO-->",form.value);
    this.service.serviceLogin(form.value).subscribe((res:Res) => {

      console.log('Res-->', res);
      console.log(`ERROR->${res.ok}`);
      console.log(`MSG->${res.msg}`);
    });
  }
}

interface Res{
  ok:boolean,
  msg:string
}