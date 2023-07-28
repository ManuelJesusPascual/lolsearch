import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSession } from '@supabase/supabase-js';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastService: MessageService,
    private router: Router
  ) {}

  /**
   * Variable que contendrá la sesión del usuario
   */
  @Input()
  session!: AuthSession | null;

  /**
   * Variable que controlará si se está realizando alguna petición a la API
   */
  loading: boolean = false;

  loginForm = new FormGroup({
    /**
     * Controlador del input del email de usuario
     */
    mail: new FormControl('', Validators.required),
    /**
     * Controlador del input de la contraseña
     */
    password: new FormControl('', Validators.required),
  });

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  /**
   * Método que iniciará sesión tras pulsar el botón de login
   */
  submit = () => {
    try {
      this.loading = true;
      console.log(this.loading);
      const mail = this.loginForm.value.mail;
      const password = this.loginForm.value.password;
      this.authService.signIn(mail!, password!).then((response) => {
        if (response.error) {
          this.toastService.add({
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: response.error.message,
            sticky: true,
            closable: true,
          });
        } else {
          this.toastService.add({
            severity: 'success',
            summary: 'Sesion iniciada correctamente',
            sticky: true,
            closable: true,
          });
          this.router.navigate([''], {
            queryParams: { session: this.authService._session },
          });

          //Redirect a home pasando por parametro la session
        }
      });
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  };
}
