import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistrosComponent } from './registros/registros.component';
import { PermisosComponent } from './permisos/permisos.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    RegistrosComponent,
    PermisosComponent,
    IngresoComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  exports: [],
})
export class PagesModule {}
