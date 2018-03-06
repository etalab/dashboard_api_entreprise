import router from '@/router'

const actions = {
  push (ctx, routeName) {
    router.push({ name: routeName })
  }
}

export default {
  namespaced: true,
  actions
}
