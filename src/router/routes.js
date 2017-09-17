import Index from '@/views/Index'
import Cmanage from '@/views/index/Index'
import Login from '@/views/login/Index'
import LoginPage from '@/views/login/Login'

export const routes = [{
  path: '/',
  component: Index,
  children: [{
    path: '/',
    component: Cmanage
  }]
}, {
  path: '/login',
  component: Login,
  children: [{
    path: '/',
    component: LoginPage 
  }]
}]
