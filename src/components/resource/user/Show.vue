<template lang="pug">
.main-pane
  .profile__group
    h2 Profil utilisateur

    .form__group
      label Adresse e-mail
      div.headline {{ user.email }}
    .form__group
      label Contexte
      div.headline {{ user.context }}

  .profile__group
    h2 Tokens de l'utilisateur
    jwt-api-entreprise-index(:jwtList="tokens")

    jwt-api-entreprise-new

  .profile__group
    h2 Contacts

    .contact__container
      contact-tile(v-for="(contact, index) in contacts" :key="index" :contact="contact")

    button.button Ajouter un contact
</template>

<script>
import JWTAPIEntrepriseNew from '@/components/resource/jwt_api_entreprise/New'
import JWTAPIEntrepriseIndex from '@/components/resource/jwt_api_entreprise/Index'
import ContactTile from '@/components/resource/contact/Show'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('user')

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
    ...mapGetters(['user', 'contacts', 'tokens'])
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
