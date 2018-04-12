<template lang="pug">
  .profile__group
    h2 Contacts

    .contact__container.row(v-if="contacts.length > 0")
      contact-tile(class="contact" v-for="(contact, index) in contacts" :contact="contact" :key="index")
    p(v-else) Aucune coordonnée de contact

    button.button(v-if="isAdmin") Ajouter un contact
</template>

<script>
import UserTabs from '@/components/resource/user/Tabs'
import ContactTile from '@/components/resource/contact/Show'
import { mapGetters } from 'vuex'

export default {
  name: 'user-contacts',

  components: {
    'contact-tile': ContactTile
  },

  computed: {
    ...mapGetters({
      contacts: 'user/contacts',
      isAdmin: 'auth/isAdmin'
    })
  }
}
</script>

<style lang="scss" scoped>
  .contact + .contact {
    margin-left: 2em;
    margin-top: 0;
  }

  .button {
    margin-top: 1em;
  }
</style>
