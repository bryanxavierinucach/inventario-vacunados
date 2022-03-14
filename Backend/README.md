<h1 align="center"> APIs services Inventario Vacunados</h1>

## Install

```sh
npm install
```

## Usage

Ejecutar para producción
```sh
npm run start 
```
Ejecutar para desarrollo
```sh
npm run dev 
```


CONFIGURAR .env

PORT=3000
//DB_USER=divergenti
//DB_PASSWORD=D!ver2021.,
DB_PASSWORD=d1v3r!Gent1s
DB_USER=postgres
//DB_PASSWORD=root

TOKEN = https://auth.divergenti.cl/auth/realms/inventario/protocol/openid-connect/token
LOGOUT = https://auth.divergenti.cl/auth/realms/inventario/protocol/openid-connect/logout
KEYCLOAK_GRANTYPE = client_credentials
KEYCLOAK_CLIENTID = admin-cli
KEYCLOAK_CLIENTSECRET = fc00c797-5bf5-46c0-8575-31bb62e3a9ec
KEYCLOAK_USERS = https://auth.divergenti.cl/auth/admin/realms/inventario/users/
KEYCLOAK_GROUPS_TALENT = https://auth.divergenti.cl/auth/admin/realms/inventario/groups/8ba149fc-bce5-4c4d-8afe-dca495e58c38
KEYCLOAK_GROUPS = https://auth.divergenti.cl/auth/admin/realms/inventario/groups/

KEYCLOAK_ROLE = https://auth.divergenti.cl/auth/admin/realms/inventario/roles/
