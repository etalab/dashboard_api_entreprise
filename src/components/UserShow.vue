<template lang="pug">
div
  h4 Profil utilisateur
  v-card
    v-card-text
      v-container(fluid)

        v-layout(row)
          v-flex(xs3)
            v-subheader Adresse e-mail
          v-flex(xs9)
            v-text-field(
              name="input-email"
              :value="user.email"
              single-line
              disabled)

        v-layout(row)
          v-flex(xs3)
            v-subheader Contexte
          v-flex(xs9)
            v-text-field(
              name="input-context"
              :value="user.context"
              single-line
              disabled)

  h4 Tokens de l'utilisateur
  ul
    li(v-for="(token, index) in user.tokens" key="index") {{ token }}
</template>

<script>
export default {
  name: 'user-show',
  data () {
    return {
      user: {}
    }
  },

  created: function () {
    let userId = this.$route.params.id
    this.$http.get(`/users/${userId}`)
      .then(response => {
        this.user = response.data
      })
  }
}
</script>
