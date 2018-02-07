<template lang="pug">
  div
    h3 Dashboard utilisateurs : droits attribués + stats

    p uid : {{ userId }}
    p Email : {{ userEmail }}
    p Context : {{ userContext }}

    p Contacts
      ul
        li(v-for="contact in userContacts" :key="contact.id") {{ contact }}

    p Tokens
      ul
        li(v-for="(token, index) in userTokens" :key="index") {{ token }} 

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-dashboard',

  computed: {
    ...mapGetters([
      'userId',
      'userEmail',
      'userContext',
      'userContacts',
      'userTokens'
    ])
  }
}
</script>

<style>
</style>
