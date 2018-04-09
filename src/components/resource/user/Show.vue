<template lang="pug">
.main
  .profile__group
    h2 Profil utilisateur
    .panel
      .form__group
        label Adresse e-mail
        div.headline {{ userDetails.email }}
      .form__group
        label Contexte
        div.headline {{ userDetails.context }}

  .profile__group
    h2 Droits de l'utilisateur
    .panel
      table
        thead
          th Endpoint
          th Actif
        tbody
          tr(v-for="(role, index) in allowedRoles" :key="index" :class="role.allowed ? 'enabled' : 'disabled'")
            td {{ role.name }}
            td {{ role.allowed ? 'Oui' : 'Non' }}

  .profile__group
    h2 Tokens de l'utilisateur
    jwt-api-entreprise-index(:jwtList="tokens" v-if="tokens.length > 0")
    p(v-else) Aucun token attribué

    jwt-api-entreprise-new(v-if="isAdmin")

  .profile__group
    h2 Contacts

    .contact__container.row(v-if="contacts.length > 0")
      contact-tile(class="contact" v-for="(contact, index) in contacts" :key="index" :contact="contact")
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
      allowedRoles: 'user/allowedRoles',
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

  .profile__group + .profile__group {
    margin-top: 3em;
  }

  .profile__group > h2 {
    margin-top: 0;
  }

  label {
    color: $color-dark-grey;
  }

  .contact__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  table {
    margin-bottom: 2em;
  }

  @media (max-width: 949px) {
    .contact__container {
      flex-direction: column;
    }
  }

  .contact + .contact {
    margin-left: 2em;
    margin-top: 0;
  }

  .enabled :last-child{
    color: $color-blue;
    font-weight: 700;
  }

  tr.disabled {
    color: $color-dark-grey;
    background: $color-white;
  }
</style>
