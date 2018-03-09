<template lang="pug">
.main-pane
  .profile__group
    h2 Profil utilisateur

    .form__group
      label Adresse e-mail
      div.headline {{ userDetails.email }}
    .form__group
      label Contexte
      div.headline {{ userDetails.context }}

  .profile__group
    h2 Tokens de l'utilisateur
    jwt-api-entreprise-index(:jwtList="tokens" v-if="tokens.length > 0")
    p(v-else) Aucun token attribué

    jwt-api-entreprise-new(v-if="isAdmin")

  .profile__group
    h2 Contacts

    .contact__container(v-if="contacts.length > 0")
      contact-tile(v-for="(contact, index) in contacts" :key="index" :contact="contact")
    p(v-else) Aucune coordonnée de contact

    button.button(v-if="isAdmin") Ajouter un contact
</template>

<script>
import JWTAPIEntrepriseNew from '@/components/resource/jwt_api_entreprise/New'
import JWTAPIEntrepriseIndex from '@/components/resource/jwt_api_entreprise/Index'
import ContactTile from '@/components/resource/contact/Show'
import { mapGetters } from 'vuex'

export default {
  name: 'user-show',
  data () {
    return {}
  },
  props: ['userId'],

  created: function () {
    this.$store.dispatch('user/get', { userId: this.userId })
  },

  computed: {
    ...mapGetters({
      userDetails: 'user/userDetails',
      contacts: 'user/contacts',
      tokens: 'user/tokens',
      isAdmin: 'auth/isAdmin'
    })
  },

  components: {
    'jwt-api-entreprise-new': JWTAPIEntrepriseNew,
    'jwt-api-entreprise-index': JWTAPIEntrepriseIndex,
    'contact-tile': ContactTile
  }
}
</script>

<style lang="scss" scoped>
  .main-pane {
    height: auto;
  }

  .profile__group {
    margin-bottom: 4em;
  }

  label {
    color: $color-dark-grey;
  }

  .contact__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  table {
    margin-bottom: 2em;
  }

  .panel {
    width: 40%;
  }

  .panel:first-child {
    margin-right: 2em;
  }

  .button {
    margin-top: 2em;
  }
</style>
