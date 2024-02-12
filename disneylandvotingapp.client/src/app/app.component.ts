import { Component, ViewChild } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private tokenStorageService: TokenStorageService, private observer: BreakpointObserver, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    
  }
  close():void{
    this.sidenav.close();
  }
 
}
