import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { Usuarios } from '../../models/res.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass'],
})
export class UsuarioComponent implements OnInit {
  usuarios!: Usuarios[];
  constructor(private service: ServiceAPIService) {}

  ngOnInit(): void {
    this.consultausuarios();
  }
  consultausuarios() {
    //this.service.loadingCarga(true);
    this.service.consultaUsuarios().subscribe((res: any) => {
      if (res.ok && res.codError == '0001') {
      //  this.service.loadingCarga(false);
        this.usuarios = res.usuarios;
        this.service.loadingCarga(false);
      }
    });
  }

  cambiarEstadoUsuario(idUsuario: string, estado: boolean) {
    const estadoUsuario = estado? 'deshabilitado' : 'habilitado'
    this.service.loadingCarga(true);
    this.service.actualizaEstadoUsuario({
        idUsuario: idUsuario,
        online: !estado,
      }).subscribe((res: any) => {
        if(res.ok && res.codError == '0001'){
          this.service.loadingCarga(false);
          Swal.fire(
            'Actualizar Usuario',
            'El usuario ha sido ' + estadoUsuario,
            'success'
          )
          
          this.consultausuarios();
         
        } else {
          this.service.loadingCarga(false);
          this.alertErrorMessage(res.msg)
        }
      });
  }

  verRutasPorUsuario(idusuario:string){
    this.service.verMetodosusuario(idusuario).subscribe((res:any)=>{
      if(res.ok && res.codError == '0001'){
        
      }
    });
  }

  alertaCambiarEstado(idUsuario: string, estado: boolean) {
    const estadoUsuario = estado? 'deshabilitar' : 'habilitar'
    Swal.fire({
      title: 'Actualizar Usuario',
      text: '¿Está seguro de ' + estadoUsuario +' el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ' + estadoUsuario +'!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarEstadoUsuario(idUsuario,estado)
      }
    })
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
