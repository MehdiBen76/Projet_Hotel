import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueFormulate from '@braid/vue-formulate'
import './assets/formulate.css'
import {firestorePlugin} from 'vuefire';
import store from './store'
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.use(VueFormulate),
Vue.use(firestorePlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
