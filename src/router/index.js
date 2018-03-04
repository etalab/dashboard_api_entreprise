import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/components/admin/UserIndex'
import RoleIndex from '@/components/admin/RoleIndex'
import RoleNew from '@/components/admin/RoleNew'
import UserNew from '@/components/admin/UserNew'
import UserShow from '@/components/admin/UserShow'

import Login from '@/components/Login'
import ApplicationPanel from '@/components/ApplicationPanel'
import UserConfirm from '@/components/espace_perso/UserConfirm'

import store from '@/store'

Vue.use(Router)

export default new Router({
  // TODO configure nginx to handle history mode: matching url fallback
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/confirm',
      name: 'user-confirm',
      component: UserConfirm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/logout')
        next({ name: 'login' })
      }
    },
    {
      path: '/admin',
      name: 'application-panel',
      component: ApplicationPanel,
      children: [
        // Alias URL for clients. With path beginning with '/' it will be
        // treated as a root path, but the component is still nested under
        // the main ApplicationPanel
        {
          path: '/me',
          name: 'client-view',
          component: UserShow
        },
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
