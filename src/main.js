import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import primeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
app.use(primeVue, {
  theme: {
    preset: Aura,
  },
})

createApp(App).use(router).mount('#app')
