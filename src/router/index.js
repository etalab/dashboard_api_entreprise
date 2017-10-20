import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/components/UserList'
import RoleList from '@/components/RoleList'
import RoleNew from '@/components/RoleNew'

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
      component: UserList
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleList
    },
    {
      path: '/roles/new',
      name: 'roleNew',
      component: RoleNew
    }
  ]
})
