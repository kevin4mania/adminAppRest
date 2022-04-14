import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { Usuarios } from '../../models/res.model';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass'],
})
export class UsuarioComponent implements OnInit {

  usuarios!: Usuarios[];
  userForm!: FormGroup;
  loading: boolean = true;
  constructor(private service: ServiceAPIService) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.consultausuarios();
  }
  consultausuarios() {
    this.service.loadingCarga(true);
    this.service.consultaUsuarios().subscribe((res: any) => {
      if (res.ok && res.codError == '0001') {
        this.usuarios = res.usuarios;
        this.loading = false;
        this.service.loadingCarga(false);
      } else {
        this.alertErrorMessage(res.msg)
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
          this.service.alertConfirm('Usuario actualizado!');
          this.service.loadingCarga(false);
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
  
  crearFormulario() {
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
  }
  crearUsuario() {
    $("#modalUserCreate").modal("show");
   }
   alerta() {
    
    if (this.userForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Guardar registro.',
      text: '¿Está seguro de guardar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveUsuario();
      }
    })
  }

  saveUsuario() {
    if (this.userForm.invalid) {
      return
    }
    this.service.loadingCarga(true);
    this.service.crearUsuario(this.userForm.value).subscribe((resp: any) => {
      if (resp.codError == '0001') {
        
        $("#modalUserCreate").modal("toggle")
        
        this.userForm.reset()
        this.service.loadingCarga(false);
        this.service.alertConfirm('Usuario guardado!');
        this.consultausuarios();
      } else {
        this.service.loadingCarga(false);
        Swal.fire(
          resp.msg,
          'Intentar de nuevo.',
          'warning'
        );
      }
    });
  }


}
