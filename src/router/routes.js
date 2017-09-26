import Index from '@/views/Index'
import Cmanage from '@/views/index/Index'
import Login from '@/views/login/Index'
import LoginPage from '@/views/login/Login'
import PersonInfo from '@/views/user/PersonInfo'

export const routes = [{
  path: '/',
  component: Index,
  children: [{
    path: '/',
    meta: {
      requireAuth: true,
    },
    component: Cmanage
  }]
}, {
  path: '/login',
  component: Login,
  children: [{
    path: '/',
    component: LoginPage 
  }]
}, {
  path: '/personInfo',
  component: PersonInfo
}]
