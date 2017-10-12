<template>
  <div id="app">
    <v-app>
      <nav-menu></nav-menu>
  	  <v-toolbar app></v-toolbar>
      <main>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
      <v-footer app></v-footer>
    </v-app>
  </div>
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
