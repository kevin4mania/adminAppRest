import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter, map} from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {

  titulo!: string;
  descrpicion!: string;
  icon!: string;

  constructor(
    private router: Router,
              private title: Title,
              private meta:Meta
  ) { 
  //   this.getDataRoute().subscribe(data=>{
  //     this.titulo = data['titulo'];
  //     this.descrpicion = data['descripcion'];
  //     this.icon = data['icon'];
      
  //     //Titulo Página
  //     this.title.setTitle(data['titulo']);

  //     //Título Meta Tag
  //     const metaTag: MetaDefinition = {
  //       name: this.descrpicion,
  //       content: this.titulo
  //     };

  //     this.meta.updateTag(metaTag);
  //   });
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return '';
  }

}
