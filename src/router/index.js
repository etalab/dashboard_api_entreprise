import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from '@/components/layout/AdminPanel'
import UserIndex from '@/components/UserIndex'
import RoleIndex from '@/components/RoleIndex'
import RoleNew from '@/components/RoleNew'
import UserNew from '@/components/UserNew'
import UserShow from '@/components/UserShow'
import Login from '@/components/Login'
import UserLogin from '@/components/espace_perso/UserLogin'
import UserDashboard from '@/components/espace_perso/UserDashboard'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  // TODO configure nginx to handle history mode: matching url fallback
  // mode: 'history',
  routes: [
    {
      path: '/account/login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: '/account/dashboard',
      name: 'user-dashboard',
      component: UserDashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/',
      redirect: '/users',
      component: AdminPanel,
      children: [
        {
          path: 'users',
          name: 'users',
          component: UserIndex
        },
        {
          path: 'roles',
          name: 'roles',
          component: RoleIndex
        },
        {
          path: 'roles/new',
          name: 'roleNew',
          component: RoleNew
        },
        {
          path: 'users/new',
          name: 'userNew',
          component: UserNew
        },
        {
          path: 'users/:userId',
          name: 'userShow',
          props: true,
          component: UserShow
        }
      ]
    }
  ]
})
