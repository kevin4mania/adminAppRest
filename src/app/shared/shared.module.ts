import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeadComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [HeadComponent,FooterComponent],
})
export class SharedModule {}
