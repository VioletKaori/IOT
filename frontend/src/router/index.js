import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Main from '@/views/Main'
import Home from '@/components/Home'
import Wifi from '@/components/Wifi'
import Settings from '@/components/Settings'
import Account from '@/components/Account'
import Profile from '@/components/Profile'
import Page404 from '@/views/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        title: '物联网数据服务平台'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '物联网数据服务平台'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        title: '主页'
      },
      children: [
        { path: 'Home', component: Home },
        { path: 'Wifi', component: Wifi },
        {
          path: 'Settings',
          component: Settings,
          children: [
            {
              path: 'Account', component: Account
            },
            {
              path: 'Profile', component: Profile
            }
          ]
        }
      ]
    },
    { path: '*', redirect: '/404' },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
      meta: {
        title: '404'
      }
    }
  ]
})

// 路由跳转之前查看是否存在token
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && !localStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
