import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.sass']
})
export class RegistrosComponent implements OnInit {
  usuarios!: any[];
  constructor() { }

  ngOnInit(): void {
  }
  cambiarEstadoRegistro(){

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
        this.cambiarEstadoRegistro()
      }
    })
  }

  verRutasPorUsuario(id:string){

  }

}
