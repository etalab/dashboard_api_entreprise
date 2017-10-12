<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template slot="items" scope="props">
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.token }}</td>
    </template>
  </v-data-table>
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
      items: []
    }
  },

  created: function () {
    this.$http.get('/users')
      .then(response => {
        this.items = response.data
      })
  }
}
</script>
