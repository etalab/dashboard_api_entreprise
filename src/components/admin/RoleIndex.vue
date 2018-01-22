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
      @click="roleForm")
      v-icon add

    v-data-table(:headers="headers" :items="roles" class="elevation-1")
      template(slot="items" scope="props")
        td {{ props.item.name }}
        td {{ props.item.code }}
</template>

<script>
export default {
  name: 'role-list',
  data () {
    return {
      title: 'Rôles',
      headers: [
        { text: 'Nom', value: 'name', align: 'left' },
        { text: 'Code', value: 'code', align: 'left' }
      ],
      roles: []
    }
  },

  created: function () {
    this.$store.dispatch('setPageTitle', this.title)

    this.$http.get('/roles')
      .then(response => {
        this.roles = response.data
      })
  },

  methods: {
    roleForm: function () {
      this.$router.push({ name: 'roleNew' })
    }
  }
}
</script>
