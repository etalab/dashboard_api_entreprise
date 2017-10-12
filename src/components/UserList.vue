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
      items: [
        { email: 'coucou@hello.yo', token: 'verytoken' },
        { email: 'yo@coucou.fr', token: 'muchaccess' },
        { email: 'coucou@sup.sup', token: 'dunnowattosay' }
      ]
    }
  },

  created: function () {
    axios.get(`http://watchdoge.entreprise.api.gouv.fr/api/admin/users`)
      .then(response => {
        this.items = response.data
      })
  }
}
</script>
