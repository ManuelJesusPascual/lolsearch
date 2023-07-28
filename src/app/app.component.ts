import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LolSearch';
  session = this.supabase.session;

  constructor(private readonly supabase: AuthService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      console.log('awa', session?.user);
      this.session = session;
    });
  }
}
