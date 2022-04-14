import { Component, OnInit } from '@angular/core';
import { RegistroMetodosBDD, ResAPI } from 'src/app/models/registros.model';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.sass']
})
export class RegistrosComponent implements OnInit {
  registros!: RegistroMetodosBDD[];
  usuarioLogeado:string=localStorage.getItem('idUser')||'';
  constructor(private service: ServiceAPIService) { }

  ngOnInit(): void {
    this.consultaRegistros();
  }
  consultaRegistros(){
    this.service.consultaRegistros().subscribe((res:ResAPI)=>{
      if(res.ok && res.codError=='0001'){
        this.registros=res.registroMetodosBDD;
      }
    })
  }
  cambiarEstadoRegistro(idRegistro: string, estado: boolean){
    const estadoUsuario = estado? 'deshabilitado' : 'habilitado'
    this.service.loadingCarga(true);
    this.service.actualizaEstadoRegistro({
      idRegistroRuta: idRegistro,
        online: !estado,
      }).subscribe((res: any) => {
        if(res.ok && res.codError == '0001'){
          this.service.loadingCarga(false);
          Swal.fire(
            'Actualizar Registro',
            'El registro ha sido ' + estadoUsuario,
            'success'
          )
          this.consultaRegistros();
        } else {
          this.service.loadingCarga(false);
          this.alertErrorMessage(res.msg)
        }
      });
  }

  alertaCambiarEstado(idUsuario: string, estado: boolean) {
    const estadoUsuario = estado? 'deshabilitar' : 'habilitar'
    Swal.fire({
      title: 'Actualizar Registro',
      text: '¿Está seguro de ' + estadoUsuario +' el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ' + estadoUsuario +'!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarEstadoRegistro(idUsuario,estado)
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
