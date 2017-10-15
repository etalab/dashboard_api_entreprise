<template lang="pug">
  #app
    v-app
      nav-menu
      v-toolbar(app)
      main
        v-content
          v-container(fluid)
            router-view
</template>

<script>
import NavMenu from '@/components/layout/NavMenu'

export default {
  name: 'app',
  components: {
    'nav-menu': NavMenu
  }
}
</script>
