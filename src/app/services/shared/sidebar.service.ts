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
      icono: 'ik ik-user',
      url: '/tramites',
      submenu:[]
    },
    {
      titulo: 'Rutas',
      icono: 'ik ik-file-text',
      url: '/rutas',
      submenu:[]
    }
  ];
  constructor() {

  }

 
}
