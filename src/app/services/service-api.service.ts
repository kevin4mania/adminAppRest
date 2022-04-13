import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

import { Res, Usuarios } from '../models/res.model';

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
  constructor(private http: HttpClient) {}

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
}
