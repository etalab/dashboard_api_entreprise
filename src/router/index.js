import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from '@/components/admin/layout/AdminPanel'
import UserIndex from '@/components/admin/UserIndex'
import RoleIndex from '@/components/admin/RoleIndex'
import RoleNew from '@/components/admin/RoleNew'
import UserNew from '@/components/admin/UserNew'
import UserShow from '@/components/admin/UserShow'
import Login from '@/components/admin/Login'
import Logout from '@/components/admin/Logout'

import UserApp from '@/components/layout/UserApp'
import UserConfirm from '@/components/espace_perso/UserConfirm'
import UserLogin from '@/components/espace_perso/UserLogin'
import UserDashboard from '@/components/espace_perso/UserDashboard'

Vue.use(Router)

export default new Router({
  // TODO configure nginx to handle history mode: matching url fallback
  // mode: 'history',
  routes: [
    {
      path: '/account/confirm',
      name: 'user-confirm',
      component: UserConfirm
    },
    {
      path: '/account/login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: '/account',
      component: UserApp,
      children: [
        {
          path: '/',
          name: 'user-dashboard',
          component: UserDashboard
        }
      ]
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
