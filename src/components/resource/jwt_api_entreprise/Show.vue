<template>
<div v-bind:class="{ disabled_token: !jwt.enabled }">
  <div class="panel__header">
    <h3 class="token__name">Organisme utilisateur final : {{ jwt.payload.sub }}</h3>
    <small class="panel__header-extra">Délivré le {{ formatDate(jwt.payload.iat) }}</small>
    <router-link :to="{ name: statsRoute, params: { jwtId: jwt.payload.jti } }" class="button-stats">Voir les statistiques →</router-link>
  </div>
  <div class="form__group token__rights">
    <label class="token__rights-label">Accès</label>
    <ul class="token__rights-list label-list">
      <li class="label" v-for="(role, index) in jwt.payload.roles" :key="index">{{ role }}</li>
    </ul>
  </div>
  <div class="form__group token__string">
    <label for="token">Token</label>

    <!-- Alerts for success/error messages on token copy -->
    <div v-if="showClipboardSuccessMsg" class="notification success closable"> Le jeton a été copié dans le press-papier !
      <button class="close" aria-label="Fermer" @click="showClipboardSuccessMsg = false">
        <svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>
      </button>
    </div>
    <div v-if="showClipboardErrorMsg" class="notification error closable"> La copie du jeton a échouée
      <button class="close" aria-label="Fermer" @click="showClipboardErrorMsg = false">
        <svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>
      </button>
    </div>

    <div class="input__group">
      <input type="text" name="token" :value="jwt.value"/>
      <button class="button icon-button"
        v-clipboard:copy.prevent="jwt.value"
        v-clipboard:success="clipboardSuccess"
        v-clipboard:error="clipboardError"
      >
        <svg class="icon icon-copy" viewBox="0 0 32 32"><use xlink:href="#icon-copy"></use></svg>
      </button>

      <button class="button warning" v-if="jwt.enabled && isAdmin"  @click="dialogDisableJwt = true">
        Désactiver
      </button>
      <div class="dialog-backdrop" v-if="dialogDisableJwt">
        <div class="dialog panel">
          <p>Êtes-vous certains de vouloir désactiver ce token ?</p>
          <div class="action-buttons">
            <button class="button small" @click="dialogDisableJwt = false">Annuler</button>
            <button class="button small warning" @click="disableJwt">Désactiver</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'jwt-api-entreprise-show',

  data () {
    return {
      showClipboardSuccessMsg: false,
      showClipboardErrorMsg: false,
      dialogDisableJwt: false
    }
  },

  props: ['jwt'],

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
    },

    clipboardSuccess (e) { this.showClipboardSuccessMsg = true },

    clipboardError (e) { this.showClipboardErrorMsg = true },

    disableJwt () {
      this.$store.dispatch('user/disableToken', { id: this.jwt.payload.jti })
        .finally(this.dialogDisableJwt = false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form__group {
    flex: 1;
    margin-bottom: 0;
  }

  .button-stats {
    float: right;
  }

  .tag {
    margin-bottom: 0.5em;
  }

  .dialog-backdrop {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .dialog {
    display: inline-block;
  }

  .disabled_token, .disabled_token input, .disabled_token label {
    color: #c9d3df;
  }
</style>
