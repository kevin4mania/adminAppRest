import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { RegistrosComponent } from './pages/registros/registros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });

