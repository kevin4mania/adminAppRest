import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { RegistrosComponent } from './pages/registros/registros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'login',
    component: IngresoComponent,
  },
  {
    path: 'registros',
    component: RegistrosComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
