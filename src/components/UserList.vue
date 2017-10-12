<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template slot="items" scope="props">
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.token }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

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
    axios.get(`${process.env.API_BASE_URL}/users`)
      .then(response => {
        this.items = response.data
      })
  }
}
</script>
