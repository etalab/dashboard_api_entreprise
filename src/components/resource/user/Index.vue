<template lang="pug">
  .main-pane
    button.button(@click="userForm") Ajouter un utilisateur

    table
      thead
        tr
          th.text-left(v-for="header in headers") {{header.text}}
      tbody
        tr(v-for="user in userList")
          td
            router-link(:to="{ name: 'userShow', params: { userId: user.id }}") {{ user.email }}
          td {{ user.context }}
          td Oui

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('user/index')

export default {
  name: 'user-index',

  data () {
    return {
      title: 'Utilisateurs',
      headers: [
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'Contexte', value: 'context', align: 'left' },
        { text: 'Vérifié', value: 'verified', align: 'left' }
      ]
    }
  },

  created: function () {
    this.$store.dispatch('user/index/index')
  },

  computed: {
    ...mapGetters(['userList'])
  },

  methods: {
    userForm: function () {
      this.$router.push({ name: 'userNew' })
    }
  }
}
</script>
