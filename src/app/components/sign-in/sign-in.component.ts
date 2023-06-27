import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/service/error.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  loading: boolean = false;

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router, private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addUser(){
    //validar que el usuario ingrese valores
    if(this.username == "" || this.password == "" || this.confirmPassword == ""){
      this.toastr.error("Todos los campos son obligatorios", "Error");
      return;
    }
    //validamos que las contraseñas sean iguales
    if(this.password != this.confirmPassword){
      this.toastr.error("Las contraseñas no coinciden", "Error");
      return;
    }
    //creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) =>{
      this.loading = false;
      this.toastr.success(`El usuario ${this.username} fue registrado con exito`, `Usuario registado`);
      this.router.navigate(["/login"])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
      complete: () => console.log("complete")
    })
  }

}
