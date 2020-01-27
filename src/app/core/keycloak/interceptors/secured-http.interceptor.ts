import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { KeycloakService } from '@core/keycloak/services/keycloak.service';

@Injectable()
export class SecuredHttpInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}
  /**
   * Intercepts the http request and add the bearer token of the currently logged user.
   *
   * @param request http request
   * @param next http handler
   */
  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // const started = Date.now();
    if ( this.keycloakService.auth.authz != null && this.keycloakService.auth.loggedIn && this.keycloakService.auth.authz.authenticated ) {
      this.keycloakService.getToken();

      const kcToken = this.keycloakService.auth.authz.token;

      request = request.clone( {
        setHeaders: {
          Authorization: 'Bearer ' + kcToken
        }
      } );
    }
    return next.handle( request );
  }
}
