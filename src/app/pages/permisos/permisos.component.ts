import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../../services/service-api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

// This lets me use jquery
declare var $: any;
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.sass']
})
export class PermisosComponent implements OnInit {

  rutasAsignadas:any[]=[]
  rutasNoAsignadas:any[]=[]
  selectedRutas:any[] =[]
  idUsuario:any='';
  loading: boolean = true;
  loading2: boolean = true;
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
          this.loading = false;
          this.apiService.loadingCarga(false);
        } else {
          this.rutasAsignadas = []
          this.loading = false;
          this.apiService.alertErrorMessage(resp.msg)
        }
    })
  }

  alertaCambiarEstadoPermiso(id:string, estado:boolean) {
    const estadoRuta = !estado? 'otorgar': 'quitar';
    Swal.fire({
      title: 'Actualizar Permiso',
      text: '¿Está seguro de ' + estadoRuta +' el permiso al usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, aceptar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quitarPermiso(id, estado);
        //this.cambiarEstadoUsuario(idUsuario,estado)
      }
    })
  }

  quitarPermiso(id:string, estado:boolean) {
    this.apiService.loadingCarga(true);
    const permiso = {
      "idMetodo":id,
      "online": !estado
    }
    this.apiService.quitarPermisoUsuarioRuta(permiso).subscribe((resp:any)  => {
      if (resp.ok && resp.codError == '0001') {
          this.apiService.loadingCarga(false);
          Swal.fire(
            'Quitar Permiso',
            'Permiso eliminado!',
            'success'
          )
          this.consultarMetodos();
        } else {
          this.apiService.loadingCarga(false);
          this.apiService.alertErrorMessage(resp.msg)
        }
    })
  }

  asignarRutas() {
  this.consultarMetodosNoAsignados();
  }

  consultarMetodosNoAsignados() {
    this.rutasNoAsignadas = [];
    this.selectedRutas = [];
    this.apiService.loadingCarga(true);
    this.apiService.consultarRutasNoAsignadas(this.idUsuario).subscribe((resp:any)  => {
      if (resp.ok && resp.codError == '0001') {
          this.rutasNoAsignadas = resp.metodosSinAcceso;
          this.loading2 = false;
          this.apiService.loadingCarga(false);
          $("#modalAsignar").modal("show");
        } else {
          this.rutasNoAsignadas = []
          this.loading2 = false;
          this.apiService.alertErrorMessage(resp.msg)
        }
       
    })
  }

  asignar() {
    this.apiService.loadingCarga(true);
    const rutas = []
    for(const ruta of this.selectedRutas) {
      rutas.push({ruta:ruta.URL});
    }
    const rutasAsignar = {
      idUsuario: this.idUsuario,
      arrMetodos: rutas
    }
    
    this.apiService.asignarRutasUsuario(rutasAsignar).subscribe((resp:any)  => {
      if (resp.ok && resp.codError == '0001') {
        $("#modalAsignar").modal("toggle");
          this.apiService.alertConfirm('Rutas asignadas!');
          this.apiService.loadingCarga(false);
          this.consultarMetodos();
        } else {
          this.apiService.alertErrorMessage(resp.msg)
        }
    })
    
  }

}
