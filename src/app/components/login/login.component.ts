import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private toastService: MessageService
  ) {}

  /**
   * Variable que controlará si se está realizando alguna petición a la API
   */
  loading = false;

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

  /**
   * Método que iniciará sesión tras pulsar el botón de login
   */
  submit = () => {
    try {
      this.loading = true;
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
          throw new Error(response.error.message);
        } else {
          alert('Login correcto');
        }
      });
    } finally {
      this.loading = false;
    }
  };
}
