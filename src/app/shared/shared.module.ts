import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [HeadComponent, FooterComponent, SidebarComponent, HeaderComponent, BreadcrumbComponent, NopagefoundComponent],
  imports: [CommonModule,MatSliderModule, RouterModule],
  exports: [HeadComponent,FooterComponent,SidebarComponent, HeaderComponent, BreadcrumbComponent, NopagefoundComponent],
})
export class SharedModule {}
