import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../../environments/environment';
import {Usuario} from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {

  constructor(private http: HttpClient,) { }

  serviceLogin(usuario:Usuario){
    return this.http.post<Res>(`${environment.restApiMatriculacio}/api/login`,usuario);
  }


}

interface Res{
  ok:boolean,
  msg:string
}