import axios from 'axios'

// 因为axios默认发的是json格式数据，我们要做表单提交，需要更改axios配置
// 引入 Qs是为了把json格式，转为formdata 的数据格式
import Qs from 'qs'
import ElementPlus from "element-plus";
import router from "@/router";
const service = axios.create({
    baseURL: 'http://localhost:8088',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data);
    }],
});


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
        alert('吞吞吐吐')
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
        if (response.data.code === 403) {
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
export default service;
