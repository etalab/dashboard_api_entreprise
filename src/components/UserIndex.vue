<template lang="pug">
  v-data-table(:headers="headers" :items="users" class="elevation-1")
    template(slot="items" scope="props")
      td {{ props.item.email }}
      td {{ props.item.token }}
</template>

<script>
export default {
  name: 'user-list',
  data () {
    return {
      headers: [
        { text: 'E-mail', value: 'email', align: 'left' },
        { text: 'Token', value: 'token', align: 'left' }
      ],
      users: []
    }
  },

  created: function () {
    this.$http.get('/users')
      .then(response => {
        this.users = response.data
      })
  }
}
</script>
