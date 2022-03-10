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
  questionary: {
    mainEndpoint: 'questionary/',
    complete: 'questionary-complete/',
  },
  question: {
    mainEndpoint: 'question/',
    questionary: 'questionary/',
  },
  section: {
    mainEndpoint: 'section/',
    questionary: 'questionary/',
    all: 'all/',
  },
  option: {
    mainEndpoint: 'option/',
    answer: 'answer/',
    question: 'question/',
  },
  wallet: {
    mainEndpoint: 'wallet/',
    user: 'user/',
    validateaddress: 'validateaddress/',
  },
  reward: {
    mainEndpoint: 'reward/',
  },
  feedback: {
    mainEndpoint: 'feedback/',
    section: 'section/',
  },
  sectionAnswer: {
    mainEndpoint: 'sectionAnswer/',
    questionaries: 'questionaries/user/',
    questionary: 'questionary/',
    report: 'report/',
  },
  opportunity: {
    mainEndpoint: 'opportunity/',
    pyme: 'pyme/',
    accept: 'accept/',
    finish: 'finish/',
    status: 'status/active/',
    talent: 'talent/',
    match: 'match/',
  },
  category: {
    mainEndpoint: 'category/',
  },
  proposal: {
    mainEndpoint: 'proposal/',
    opportunity: 'opportunity/',
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
  interest: {
    mainEndpoint: 'interest/',
  },
  achievement: {
    mainEndpoint: 'achievement/',
  },
  userAchievement: {
    mainEndpoint: 'userAchievement/',
    achievement: 'achievement/',
    user: 'user/',
  },
  user: {
    mainEndpoint: 'user/',
    social: 'social/',
  },
  paymentMethod: {
    mainEndpoint: 'paymentMethod/',
    opportunity: 'opportunity/',
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
  oauthSocial: {
    token: 'auth/social/',
    redirectUri: environment.redirectUri,
    mainEndpoint: `${environment.oauthKeycloak}/auth/realms/divergenti/protocol/openid-connect/auth?client_id=divergenti-api-social&response_type=code&scope=openid`,
    linkedin: `&kc_idp_hint=linkedin&redirect_uri=${environment.redirectUri}`,
    google: `&kc_idp_hint=google&redirect_uri=${environment.redirectUri}`,
    apple: `&kc_idp_hint=apple&redirect_uri=${environment.redirectUri}`,
  },
  dashboard: {
    mainEndpoint: 'dashboard/',
    admin: 'admin/',
    users: 'users/',
  },
  templateEmail: {
    mainEndpoint: 'templateemail/',
  },
};

