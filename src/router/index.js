import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/UserIndex'
import RoleIndex from '@/components/RoleIndex'
import RoleNew from '@/components/RoleNew'
import UserNew from '@/components/UserNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
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
    }
  ]
})
