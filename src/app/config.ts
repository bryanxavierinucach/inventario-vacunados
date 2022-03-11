import { environment } from './../environments/environment';

export const config = {
  api: {
    url: `${environment.apiUrl}/api/`,
    remote: `${environment.apiUrl}`,
    authentication: 'authentication',
    password_flow: 'password-flow',
    refresh_token: 'refresh-token',
    remoteAuth: `${environment.oauthKeycloak}`,
    token: 'auth/realms/inventario/protocol/openid-connect/token',
    refresh: 'auth/realms/inventario/protocol/openid-connect/token',
    sendEmail: 'user/emailverifier/',
    logout: 'auth/logout',
  },
  register: {
    mainEndpoint: 'user/',
    username: 'username/',
    groups: 'groups/',
    list: 'list/',
    password: 'password/',
    enabled: 'update/enabled/',
  },
  keyloak: {
    mainEndpoint: 'keycloak/group/',
    talent: 'talent/',
    pyme: 'pyme/',
  },
  profile: {
    mainEndpoint: 'profile/',
    countries: 'countries/',
    profileAll: 'all/',
    users: 'user/',
    category: 'category/',
    talent: 'talent/',
  },
  user: {
    mainEndpoint: 'user/',
    social: 'social/',
  },
  register2: {
    url: `${environment.apiUrl}/`,
    mainEndpoint: 'user/',
    keycloak: 'keycloak/',
    userPaginate: 'userPaginate/',
    username: 'username/',
    groups: 'groups/',
    list: 'list/',
    password: 'password/',
    enabled: 'update/enabled/',
    sendmail: 'validate/sendmail',
    auth: 'auth/',
    linkedin: 'linkedin/',
  },
};

