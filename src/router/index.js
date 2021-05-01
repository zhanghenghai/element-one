import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from "@/views/login/login";


const routes = [
  {
    path:'/login',
    name:'login',
    component: login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

router.beforeEach((to, from, next) => {
//to到哪儿 from从哪儿离开 next跳转 为空就是放行
  if (to.path === '/login') {
    //如果跳转为登录，就放行
    next();
  } else {
    //取出localStorage判断
    let token = localStorage.getItem('authorization');
    console.log("token的值>>>>>>" + token)
    if (token == null || token === '') {
      console.log('请先登录')
      next('/login');
    } else {
      next();
    }
  }});
