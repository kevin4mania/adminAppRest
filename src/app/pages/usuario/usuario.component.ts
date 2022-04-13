import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { Usuarios } from '../../models/res.model';

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
    this.service.consultaUsuarios().subscribe((res: any) => {
      if (res.ok && res.codError == '0001') {
        // localStorage.getItem('x-token');
        this.usuarios = res.usuarios;
      }
    });
  }

  cambiarEstadoUsuario(idUsuario: string, estado: boolean) {
    console.log(idUsuario,estado);
    
    this.service
      .actualizaEstadoUsuario({
        idUsuario: idUsuario,
        online: !estado,
      })
      .subscribe((res: any) => {
        if(res.ok && res.codError == '0001'){
          this.consultausuarios();
        }
      });
  }

  verRutasPorUsuario(idusuario:string){
    this.service.verMetodosusuario(idusuario).subscribe((res:any)=>{
      if(res.ok && res.codError == '0001'){
        
      }
    });
  }


}
