import * as Keycloak from "keycloak-js";

export let initOptions = {
    url: 'http://127.0.0.1:8081/auth', realm: 'keycloak-demo', clientId: 'vue-test-app', onLoad:'login-required'
}

export let keycloak = Keycloak(initOptions);

