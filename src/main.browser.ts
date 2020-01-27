import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppBrowserModule } from 'app/app.browser.module';
import { KeycloakService } from 'app/core/keycloak/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}
// for showing loading indicator
KeycloakService.init().then(() => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule)
    .then(() => {
      console.log('LOADED');
      // hide loading here dom.remove()
    })
    .catch(err => console.log(err));
});
