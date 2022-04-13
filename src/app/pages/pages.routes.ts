import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { UsuarioComponent } from './usuario/usuario.component';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "usuario",
        component: UsuarioComponent,
        data: {
          titulo: "Mi Perfil",
          descripcion: "Personaliza tus datos",
          icon: "ik ik-user",
        },
      },
      { path: "", redirectTo: "/usuario", pathMatch: "full" },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
