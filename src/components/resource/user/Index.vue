<template lang="pug">
  .main
    h2 Liste des utilisateurs
    button.button.small.title-button(@click="userForm") Ajouter un utilisateur
    .panel
      table
        thead
          tr
            th.text-left(v-for="header in headers") {{header.text}}
        tbody
          tr(v-for="user in userList")
            td
              router-link(:to="{ name: 'admin-user-profile', params: { userId: user.id }}") {{ user.email }}
            td {{ user.context }}
            td {{ user.confirmed ? 'Oui' : 'Non' }}

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
        { text: 'Confirmé', value: 'confirmed', align: 'left' }
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

<style lang="scss" scoped>
  h2 {
    display: inline-block;
  }

  td, th {
    word-break: initial;
  }
</style>
