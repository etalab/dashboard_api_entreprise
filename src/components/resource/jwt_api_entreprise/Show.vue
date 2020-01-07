<template>
  <div :class="{ blacklisted_token: jwt.blacklisted }">
    <div class="panel__header">
      <h3 class="token__name">Cadre d’utilisation : {{ jwt.payload.sub }}</h3>
      <small class="panel__header-extra"
        >Délivré le {{ formatDate(jwt.payload.iat) }}</small
      >
      <router-link
        :to="{ name: statsRoute, params: { jwtId: jwt.payload.jti } }"
        class="button-stats"
        >Voir les statistiques →</router-link
      >
    </div>
    <div class="form__group token__rights">
      <label class="token__rights-label">Accès</label>
      <ul class="token__rights-list label-list">
        <li
          v-for="(role, index) in jwt.payload.roles"
          :key="index"
          class="label"
        >
          {{ role }}
        </li>
      </ul>
    </div>
    <div class="form__group token__string">
      <label for="token">Token</label>

      <!-- Alerts for success/error messages on token copy -->
      <div v-if="showClipboardSuccessMsg" class="notification success closable">
        Le jeton a été copié dans le press-papier !
        <button
          class="close"
          aria-label="Fermer"
          @click="showClipboardSuccessMsg = false"
        >
          <svg class="icon icon-cross">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </button>
      </div>
      <div v-if="showClipboardErrorMsg" class="notification error closable">
        La copie du jeton a échouée
        <button
          class="close"
          aria-label="Fermer"
          @click="showClipboardErrorMsg = false"
        >
          <svg class="icon icon-cross">
            <use xlink:href="#icon-cross"></use>
          </svg>
        </button>
      </div>

      <div class="input__group">
        <input type="text" name="token" :value="jwt.value" />
        <button
          v-clipboard:copy.prevent="jwt.value"
          v-clipboard:success="clipboardSuccess"
          v-clipboard:error="clipboardError"
          class="button icon-button"
        >
          <svg class="icon icon-copy" viewBox="0 0 32 32">
            <use xlink:href="#icon-copy"></use>
          </svg>
        </button>

        <button
          v-if="!jwt.blacklisted && isAdmin"
          class="button warning"
          @click="dialogBlacklistJwt = true"
        >
          Blacklister
        </button>
        <button
          v-if="!jwt.blacklisted && isAdmin"
          class="button secondary"
          @click="dialogArchiveJwt = true"
        >
          Archiver
        </button>
      </div>
    </div>
    <div v-if="dialogBlacklistJwt" class="dialog-backdrop">
      <div class="dialog panel">
        <p>Êtes-vous certains de vouloir blacklister ce token ?</p>
        <div class="action-buttons">
          <button class="button small" @click="dialogBlacklistJwt = false">
            Annuler
          </button>
          <button class="button small warning" @click="blacklistJwt">
            Blacklister
          </button>
        </div>
      </div>
    </div>
    <div v-if="dialogArchiveJwt" class="dialog-backdrop">
      <div class="dialog panel">
        <p>Êtes-vous certains de vouloir archiver ce token ?</p>
        <div class="action-buttons">
          <button class="button small" @click="dialogArchiveJwt = false">
            Annuler
          </button>
          <button class="button small warning" @click="archiveJwt">
            Archiver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "JwtApiEntrepriseShow",

  props: {
    jwt: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      showClipboardSuccessMsg: false,
      showClipboardErrorMsg: false,
      dialogBlacklistJwt: false,
      dialogArchiveJwt: false
    };
  },

  computed: {
    ...mapGetters({
      isAdmin: "auth/isAdmin"
    }),

    statsRoute() {
      return this.isAdmin ? "admin-jwt-stats" : "client-jwt-stats";
    }
  },

  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000); // wtf JS ...
      return date.toLocaleString("fr-FR");
    },

    clipboardSuccess() {
      this.showClipboardSuccessMsg = true;
    },

    clipboardError() {
      this.showClipboardErrorMsg = true;
    },

    blacklistJwt() {
      this.$store
        .dispatch("user/blacklistToken", { id: this.jwt.payload.jti })
        .finally((this.dialogBlacklistJwt = false));
    },

    archiveJwt() {
      this.$store
        .dispatch("user/archiveToken", { id: this.jwt.payload.jti })
        .finally((this.dialogArchiveJwt = false));
    }
  }
};
</script>

<style lang="scss" scoped>
.form__group {
  flex: 1;
  margin-bottom: 0;
}

.input__group .button {
  margin-left: 1em;
}

.button-stats {
  float: right;
}

.tag {
  margin-bottom: 0.5em;
}

.dialog-backdrop {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  z-index: 100;
  padding: 5em 0;
}

.dialog {
  display: inline-block;
}

.blacklisted_token,
.blacklisted_token input,
.blacklisted_token label {
  color: #c9d3df;
}
</style>
