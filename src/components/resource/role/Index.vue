<template lang="pug">
  .main
    h2 Rôles
    .panel
      table
        thead
          tr
            th.text-left(v-for="header in headers") {{ header.text }}
        tbody
          tr(v-for="role in index")
            td {{ role.name }}
            td {{ role.code }}
      button.button(@click="roleForm") Ajouter un rôle
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('role')

export default {
  name: 'role-index',
  data () {
    return {
      title: 'Rôles',
      headers: [
        { text: 'Nom', value: 'name', align: 'left' },
        { text: 'Code', value: 'code', align: 'left' }
      ]
    }
  },

  created: function () {
    this.$store.dispatch('role/index')
  },

  computed: {
    ...mapGetters(['index'])
  },

  methods: {
    roleForm: function () {
      this.$router.push({ name: 'roleNew' })
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    margin-top: 1em;
  }
</style>
