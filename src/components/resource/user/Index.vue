<template lang="pug">
  .main
    .panel
      .panel__header
        h2 Liste des utilisateurs
        button.button.small.title-button(@click="userForm") Ajouter un utilisateur

      .form__group
        input(v-model="search", placeholder="recherche par UUID, email, contexte")

      .form__group
        v-data-table.elevation-1(:headers="headers", :items="userList", :search="search")
          template(v-slot:items="props")
            td
              router-link(:to="{ name: 'admin-user-profile', params: { userId: props.item.id }}") {{ props.item.email }}
            td {{ props.item.context }}
            td {{ props.item.confirmed ? 'Oui' : 'Non' }}
            td.hidden {{ props.item.id }}

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import 'vuetify/dist/vuetify.min.css'
const { mapGetters } = createNamespacedHelpers('user/index')

export default {
  name: 'user-index',

  data () {
    return {
      title: 'Utilisateurs',
      search: '',
      headers: [
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'Contexte', value: 'context', align: 'left' },
        { text: 'Confirmé', value: 'confirmed', align: 'left' },
        { text: 'UUID', value: 'id', class: 'hidden' }
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

<style lang="scss">
  // thead.tr.th CSS is generated and does not work with scopes
  th.hidden {
    display: none;
  }
</style>

<style lang="scss" scoped>
  .hidden {
    display: none;
  }
  h2 {
    display: inline-block;
  }

  td, th {
    word-break: initial;
  }
</style>
