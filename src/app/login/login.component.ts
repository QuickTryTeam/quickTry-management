import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Login, Token } from '../interface/login';
import { LoadingService } from '../service/loading.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: Login = {
    username: '',
    password: ''
  }

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmitLogin() {
    this.loadingService.show();
    this.userService.login(this.login.username, this.login.password).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        let userToken: Token = { 
          token: res.data.token, 
          nickname: res.data.nickname,
          role: res.data.role
        };
        
        this.userService.saveToken(userToken.token, userToken.nickname, userToken.role);
  
        this.router.navigate(['/customers/pending'])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Username or password incorrect'
        });
      }
    });
  }
}
