<template>
  <ul class="token__list">
    <li class="panel" v-for="(token, index) in jwtList" :key="index">
      <div class="panel__header">
        <h3 class="token__name">Agent utilisateur : {{ token.payload.sub }}</h3>
        <small class="panel__header-extra">Délivré le {{ formatDate(token.payload.iat) }}</small>
        <router-link :to="{ name: statsRoute, params: { jwtId: token.payload.jti } }" class="button-stats">Voir les statistiques →</router-link>
      </div>
      <div class="form__group token__rights">
        <label class="token__rights-label">Accès</label>
        <ul class="token__rights-list tag-list">
          <li class="tag" v-for="(role, index) in token.payload.roles" :key="index">{{ role }}</li>
        </ul>
      </div>
      <div class="form__group token__string">
        <label for="token">Token</label>
        <div class="input__group">
          <input type="text" name="token" :value="token.value"/>
          <button class="button icon-button">
            <svg class="icon icon-copy" viewBox="0 0 32 32"><use xlink:href="#icon-copy"></use></svg>
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'jwt-api-entreprise-index',

  props: ['jwtList'],

  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    }),

    statsRoute () {
      return this.isAdmin ? 'admin-jwt-stats' : 'client-jwt-stats'
    }
  },

  methods: {
    formatDate (timestamp) {
      const date = new Date(timestamp * 1000) // wtf JS ...
      return date.toLocaleString('fr-FR')
    }
  }
}
</script>

<style lang="scss" scoped>
  .token__list {
    padding: 0;
    list-style-type: none;
  }

  .token__row {
    display: flex;
    flex-direction: row;
    align-items: end;
  }

  .token__row .form__group {
    flex: 1;
    margin-bottom: 0;
  }

  .button-stats {
    float: right;
  }

  .panel {
    margin-bottom: 1em;
  }

  .tag {
    margin-bottom: 0.5em;
  }
</style>
