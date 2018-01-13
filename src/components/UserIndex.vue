<template lang="pug">
  div
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
    h4 Liste des utilisateurs

    v-data-table(:headers="headers" :items="users" class="elevation-1")
      template(slot="items" scope="props")
        td
          router-link(:to="{ name: 'userShow', params: { id: props.item.id }}") {{ props.item.email }}
        td {{ props.item.context }}
</template>

<script>
export default {
  name: 'user-list',
  data () {
    return {
      headers: [
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'Contexte', value: 'context', align: 'left' }
      ],
      users: []
    }
  },

  created: function () {
    this.$http.get('/users')
      .then(response => {
        this.users = response.data
      })
  },

  methods: {
    userForm: function () {
      this.$router.push({ name: 'userNew' })
    }
  }
}
</script>
