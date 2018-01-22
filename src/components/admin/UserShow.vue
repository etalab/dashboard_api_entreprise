<template lang="pug">
div
  h4 Profil utilisateur
  v-card
    v-card-text
      h6.caption.grey--text.mb-0 Adresse e-mail
      div.headline {{ user.email }}

      h6.caption.grey--text.mb-0.mt-3 Contexte
      div.headline {{ user.context }}

  v-flex.mt-4
    h4 Tokens de l'utilisateur
      token-new(@tokenCreated="onTokenCreation" :userId="userId")

    v-card
      v-list(two-line)
        template(v-for="(token, index) in user.tokens")
          v-list-tile(:key="index")
            v-list-tile-content
              v-list-tile-title {{ token }}
              v-list-tile-sub-title date
            v-list-tile-action
              v-icon delete
          v-divider(v-if="index + 1 < user.tokens.length")

  v-flex.mt-4
    h4 Contacts
      v-btn(dark fab color="primary" small class="ml-3")
        v-icon add

  v-container(grid-list-md)
    v-layout(row wrap)
      v-flex(xs4 v-for="(contact, index) in user.contacts" :key="index")
        contact-tile(:contact="contact")
</template>

<script>
import TokenNew from '@/components/admin/TokenNew'
import ContactTile from '@/components/admin/ContactTile'

export default {
  name: 'user-show',
  data () {
    return {
      user: {}
    }
  },
  props: ['userId'],

  created: function () {
    this.$http.get(`/users/${this.userId}`)
      .then(response => {
        this.user = response.data
      })
  },

  methods: {
    onTokenCreation: function (newToken) {
      this.user.tokens.push(newToken)
    }
  },

  components: {
    'token-new': TokenNew,
    'contact-tile': ContactTile
  }
}
</script>
