import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-travel-divisas';


  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['es', 'de']);
    this.translateService.setDefaultLang('es');
  }

  cambiarIdioma(idioma: string) {
    this.translateService.use(idioma);
  }
}
