import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../../services/service-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.sass']
})
export class PermisosComponent implements OnInit {

  rutasAsignadas:any[]=[]
  idUsuario:any='';
  constructor(public apiService: ServiceAPIService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idUsuario = this.activeRoute.snapshot.paramMap.get('id');
    this.consultarMetodos();
  }

  consultarMetodos() {
    this.apiService.loadingCarga(true);
    this.apiService.verMetodosusuario(this.idUsuario).subscribe((resp:any)  => {
      if (resp.ok && resp.codError == '0001') {
          this.rutasAsignadas = resp.metodosAcceso;
          this.apiService.loadingCarga(false);
        } else {
          this.apiService.alertErrorMessage(resp.msg)
        }
    })
  }

}
