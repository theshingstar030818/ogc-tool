import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';

// Parse
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private backendService: BackendService
  ) { 
    this.backendService.initialize();
  }

  public isAuthenticated() : Observable<boolean>{
    return Parse.User.current();
  }

  public async authenticate(username: string, password: string) {
    try {
      let user = await Parse.User.logIn(username, password);
      return user;
    } catch (error) {
      return error;
    }
  }

  public async register(userData: any) {
    
    var user = new Parse.User();
    user.set("password", userData.password);
    user.set("email", userData.email);
    user.set("username", userData.email);
    user.set("emailVerified", false);
    
    try {
      await user.signUp();
      return user;
    } catch (error) {
      return error;
    }
  }

  public async requestPassword(user: any) {
    Parse.User.requestPasswordReset(user.email).then(() => {
      // Password reset request was sent successfully
      console.log('Password reset request was sent successfully')
    }).catch((error) => {
      // Show the error message somewhere
      console.log("Error: " + error.code + " " + error.message);
    });
  }

  public logout() {
    return Parse.User.logOut();
  }

}
