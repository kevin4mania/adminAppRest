import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [HeadComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule,MatSliderModule],
  exports: [HeadComponent,FooterComponent,SidebarComponent],
})
export class SharedModule {}
