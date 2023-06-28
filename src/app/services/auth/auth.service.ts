import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Variable que guardará el cliente con supabase para hacer peticiones
   */
  private supabase: SupabaseClient;
  /**
   * Variable que guardará la sesión del usuario
   */
  _session: AuthSession | null = null;
  constructor() {
    /**
     * Inicializamos el cliente de supabase pasandole la URL y la anon key guardadas en environment
     */
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
  /**
   * Método que intentará obtener la sesión del usuario logueado, si la encuentra la devuelve.
   */
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  /**
   * Método que dará la información cuando cambia la sesión del usuario.
   * @param callback Evento que se ejecuta al cambiar la sesión del usuario
   */
  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Método que servirá para iniciar la sesión de un usuario con su email y contraseña
   * @param email email del usuario
   * @param password contraseña del usuario
   */
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  /**
   * Método que cerrará la sesión del usuario actual.
   */
  signOut() {
    return this.supabase.auth.signOut();
  }
}
