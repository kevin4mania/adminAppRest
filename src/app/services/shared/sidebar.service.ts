import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu:any = [
   /* {
      titulo: 'Inicio',
      icono: 'ik ik-align-justify',
      url: '/dashboard',
      submenu:[]
    },*/
    {
      titulo: 'Usuarios',
      icono: 'ik ik-file-text',
      url: '/tramites',
      submenu:[]
    },
    {
      titulo: 'Rutas',
      icono: 'ik ik-file-text',
      url: '/matriculacion',
      submenu:[]
    },

    /*{
      titulo: 'Reportes',
      icono: 'ik ik-bar-chart-line',
      url: '#',
      submenu:[]
    },*/
    {
      titulo: 'Mi Perfil',
      icono: 'ik ik-user',
      url: '/perfil',
      submenu:[]
    }
  ];
  constructor() {

  }

 
}
