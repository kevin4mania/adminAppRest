import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { UsuarioComponent } from './usuario/usuario.component';
import { PermisosComponent } from './permisos/permisos.component';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "usuario",
        component: UsuarioComponent,
        data: {
          titulo: "Usuario",
          descripcion: "Lista de usuarios registrados",
          icon: "ik ik-user",
        },
      },
      {
        path: "usuario/rutas-asignadas/:id",
        component: PermisosComponent,
        data: {
          titulo: "Rutas Asignadas",
          descripcion: "Lista de rutas asignadas",
          icon: "ik ik-user",
        },
      },
      { path: "", redirectTo: "/usuario", pathMatch: "full" },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
