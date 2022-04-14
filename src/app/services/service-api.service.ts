import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

import { Res, Usuarios } from '../models/res.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ServiceAPIService {
  header = {
    headers: new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    ),
  };
  constructor(private http: HttpClient,
    private toastr: ToastrService) {}

  loadingCarga(value:boolean) {
    if (value) {
      let timerInterval!:any;
      Swal.fire({
        icon: 'info',
        title: 'Cargando Datos',
        text: "Por Favor espere...",
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
      return true;
    }
     else {
      Swal.close();
      return false;
    }
  }

  alertErrorMessage(mensaje:any){
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
   }

  alertConfirm(message:string) {
    this.toastr.success(message);
  }

  serviceLogin(usuario: Usuario) {
    return this.http.post<Res>(
      `${environment.restApiMatriculacio}/api/login`,
      usuario
    );
  }
  consultaUsuarios() {
    return this.http.get<Usuarios[]>(
      `${environment.restApiMatriculacio}/api/login/usuarios`,
      this.header
    );
  }
  actualizaEstadoUsuario(data:any){
    return this.http.put(`${environment.restApiMatriculacio}/api/login/actualizaUsuario`,data,this.header);
  }
  verMetodosusuario(idusuario:string){
    return this.http.get(
      `${environment.restApiMatriculacio}/api/metodos/consultaMetodosPorUsuario/${idusuario}`,
      this.header
    );
  }
  crearUsuario(usuarioForm:any){
    return this.http.post(
      `${environment.restApiMatriculacio}/api/login/new`, usuarioForm,this.header);
  }
}
