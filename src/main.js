import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from "vue-axios"
import 'imagehover.css/css/imagehover.css'


const app =createApp(App)
app.use(ElementPlus)
app.use(VueAxios,axios)
app.use(router).mount('#app')

//自动给同一个vue项目的所有请求添加请求头
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('authorization');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
})

//设置axios请求头加入token
axios.interceptors.request.use(config => {
        if (config.push === '/') {
            console.log("携带了token")
        } else {
            if (localStorage.getItem('token')) {
                //在请求头加入token，名字要和后端接收请求头的token名字一样
                config.headers.token=localStorage.getItem('token');
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

//=============================
//响应回来token是否过期
axios.interceptors.response.use(response => {
        console.log('响应回来：'+response.data.code)
        //和后端token失效返回码约定403
        if (response.data.code == 403) {
            // 引用elementui message提示框
            ElementPlus.Message({
                message: '身份已失效',
                type: 'err'
            });
            //清除token
            localStorage.removeItem('token ');
            //跳转
            router.push({name: 'login'});
        } else {
            return response
        }
    },
    error => {
        return Promise.reject(error);
    })
