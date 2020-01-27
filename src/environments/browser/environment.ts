// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isServer: false,
  // for prerender
  host: 'http://localhost:4000',
  baseUrl: 'http://localhost:4000',
  apiUrl: 'http://localhost:7070/keycloak-auth-api/rest',
  keycloakRealm: 'site3',
  keycloakClient: 'main_id',
  keycloakBaseUrl: 'http://localhost:7070/'
};
