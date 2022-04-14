import { Component, OnInit } from '@angular/core';
import { RegistroMetodosBDD, ResAPI } from 'src/app/models/registros.model';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.sass']
})
export class RegistrosComponent implements OnInit {
  registros!: RegistroMetodosBDD[];
  usuarioLogeado:string=localStorage.getItem('idUser')||'';

  registroForm!: FormGroup;

  constructor(private service: ServiceAPIService) { }

  ngOnInit(): void {
    this.crearFormulario();
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
   //**Modal Crear Usuario */
   crearRegistro() {
    $("#modalrRegistroCreate").modal("show");
   }

   crearFormulario() {
    this.registroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      observation: new FormControl('', Validators.required),
      URL: new FormControl('', Validators.required)
    });
  }
  alerta() {
    
    if (this.registroForm.invalid) {
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
        this.saveRegistro();
      }
    })
  }

  saveRegistro() {
    if (this.registroForm.invalid) {
      return
    }
    this.service.loadingCarga(true);
    this.service.crearRegistro(this.registroForm.value).subscribe((resp: any) => {
      if (resp.ok && resp.codError == '0001') {
        
        $("#modalrRegistroCreate").modal("toggle")
        
        this.registroForm.reset()
        this.service.loadingCarga(false);
        Swal.fire(
          'Crear Registro',
          'Registro creado!',
          'success'
        )
        this.consultaRegistros();
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
