import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

import * as Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  public auth: any = {};

  private redirectUrl: string;

  /**
   * Initialized keycloak client
   */
  public init(): Promise<any> {
    const keycloakAuth: any = Keycloak({
      url: 'http://localhost:7070/auth',
      realm: 'site3',
      clientId: 'main_id'
    });

    this.auth.loggedIn = false;

    debugger;

    return new Promise((resolve, reject) => {
      keycloakAuth
        .init( )
        .success(() => {
          this.auth.loggedIn = true;
          this.auth.authz = keycloakAuth;
          this.auth.registerUrl = this.auth.authz.createRegisterUrl();
          this.auth.logoutUrl =
            keycloakAuth.authServerUrl +
            '/realms/' +
            environment.keycloakRealm +
            '/protocol/openid-connect/logout?redirect_uri=' +
            environment.baseUrl +
            '/index.html';

          resolve();
        })
        .error((e) => {
          console.log(e);
          reject();
        });
    });
  }

  /**
   * Checks if the logged user is a member of the specified group
   *
   * @param groupName group name defined in keycloak
   */
  public hasGroup(groupName: string): boolean {
    return (
      this.auth.authz != null &&
      this.auth.authz.authenticated &&
      this.auth.authz.idTokenParsed.groups.indexOf('/' + groupName) !== -1
    );
  }

  /**
   * Checks if the logged user is a member of the specified groups
   *
   * @param groupNames a list of group names defined in keycloak
   */
  public hasGroups(groupNames: string[]): boolean {
    if (!groupNames) {
      return false;
    }
    return groupNames.some(e => {
      if (typeof e === 'string') {
        return this.hasGroup(e);
      }
    });
  }

  /**
   * Checks if the logged user has the role specified
   *
   * @param roleName The name of the role
   * @param resource The keycloak client
   */
  public hasRole(roleName: string, resource?: string): boolean {
    return (
      this.auth.authz.hasRealmRole(roleName) ||
      this.auth.authz.hasResourceRole(roleName) ||
      this.auth.authz.hasResourceRole(roleName, resource)
    );
  }

  /**
   * Logout the current user
   */
  public logout() {
    console.log('*** LOGOUT');
    this.auth.authz.logout({
      redirectUri: this.auth.logoutUrl
    });
    this.auth.loggedIn = false;
    this.auth.authz = null;
  }

  /**
   * Redirects to keycloak login page
   */
  public login() {
    this.auth.authz.login();
  }

  /**
   * Returns the token of the currently logged user
   */
  public getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.auth.authz.token) {
        this.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>this.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }

  /**
   * Returns true if the current user is logged in
   */
  public isLogged(): boolean {
    return this.auth.authz != null && this.auth.authz.authenticated;
  }

  /**
   * Returns keycloak registration url
   */
  public createRegisterUrl() {
    return this.auth.registerUrl;
  }
}
