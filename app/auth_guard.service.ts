import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { AuthService }    from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  
  constructor(public authservice :AuthService){

  }
  
  canActivate() {
    if(this.authservice.esta_logueado) return true;

    return false;
  }




}