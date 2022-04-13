import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistrosComponent } from './registros/registros.component';
import { PermisosComponent } from './permisos/permisos.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsuarioComponent,
    RegistrosComponent,
    PermisosComponent,
    IngresoComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SharedModule],
  exports: [],
})
export class PagesModule {}
