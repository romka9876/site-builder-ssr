import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { CheckRenderStateService } from '@shared/services/check-render-state.service';

@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService,
    protected checkRenderStateService: CheckRenderStateService
  ) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkRenderStateService.isBrowser
      ? new Promise((resolve, reject) => {
        alert('Authenticated: ' + this.authenticated);
          if (!this.authenticated) {
            this.keycloakAngular.login().then(() => { alert('Hello World'); }).catch(e => alert(e));
            return reject(false);
          }

          const requiredRoles: string[] = route.data.roles;
          if (!requiredRoles || requiredRoles.length === 0) {
            return resolve(true);
          } else {
            if (!this.roles || this.roles.length === 0) {
              resolve(false);
            }
            resolve(requiredRoles.every(role => this.roles.indexOf(role) > -1));
          }
        })
      : Promise.resolve(true);
  }
}
