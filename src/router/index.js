import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/components/UserIndex'
import RoleIndex from '@/components/RoleIndex'
import RoleNew from '@/components/RoleNew'
import UserNew from '@/components/UserNew'
import UserShow from '@/components/UserShow'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleIndex
    },
    {
      path: '/roles/new',
      name: 'roleNew',
      component: RoleNew
    },
    {
      path: '/users/new',
      name: 'userNew',
      component: UserNew
    },
    {
      path: '/users/:id',
      name: 'userShow',
      component: UserShow
    }
  ]
})
