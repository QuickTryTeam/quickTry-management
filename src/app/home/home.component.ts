import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  toggleFlag: boolean = false;
  nickname!: string | null;
  role!: string | null;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.nickname = localStorage.getItem('nickname');
    if(this.router.url === '/' || this.router.url === '') {
      this.router.navigate(['/customers/pending']);
    }
  }

  logout() {
    this.userService.logout()
  }

  toggle() {
    console.log(this.toggleFlag)
    this.toggleFlag = !this.toggleFlag;
  }
}
