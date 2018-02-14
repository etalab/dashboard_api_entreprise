<template lang="pug">
  div.mt-4
    v-btn(
      class="mb-5 mr-2"
      color="primary"
      absolute
      dark
      fab
      bottom
      right
      @click="userForm")
      v-icon add

    v-data-table(:headers="headers" :items="userList" class="elevation-1")
      template(slot="items" scope="props")
        td
          router-link(:to="{ name: 'userShow', params: { userId: props.item.id }}") {{ props.item.email }}
        td {{ props.item.context }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-list',

  data () {
    return {
      title: 'Utilisateurs',
      headers: [
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'Contexte', value: 'context', align: 'left' }
      ]
    }
  },

  created: function () {
    this.$store.dispatch('setPageTitle', this.title)
    this.$store.dispatch('fetch_user_index')
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
