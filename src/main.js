import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'imagehover.css/css/imagehover.css'




const app =createApp(App)
app.use(ElementPlus)
app.use(router).mount('#app')
