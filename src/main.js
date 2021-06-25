import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLogger from 'vuejs-logger';
import { keycloak, initOptions } from './keycloak'
import axios from 'axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const options = {
  isEnabled: true,
  logLevel : Vue.config.productionTip  ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//comment

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) =>{

  if(!auth) {
    window.location.reload();
  } else {
    Vue.$log.info("Authenticated");
  }


  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
  Vue.prototype.$keycloak=keycloak;
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 2000
  });




  localStorage.setItem("vue-token", keycloak.token);
  localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

  setInterval(() =>{
    keycloak.updateToken(70).then((refreshed)=>{
      if (refreshed) {
        Vue.$log.debug('Token refreshed');
      } else {
        Vue.$log.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(()=>{
      Vue.$log.error('Failed to refresh token');
    });


  }, 60000)

}).error(() =>{
  Vue.$log.error("Authenticated Failed");
});

