import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem("x-token");
    this.router.navigate(["/login"]);
  }

}
