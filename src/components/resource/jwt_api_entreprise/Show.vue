<template>
  <div :class="{ blacklisted_token: jwt.blacklisted }">
    <div class="panel__header">
      <h3 class="token__name">Cadre d’utilisation : {{ jwt.payload.sub }}</h3>
      <small class="panel__header-extra"
        >Délivré le {{ formatDate(jwt.payload.iat) }}</small
      >
      <router-link
        :to="{
          name: statsRoute,
          params: { jwtId: jwt.payload.jti, jwtSub: jwt.payload.sub }
        }"
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
          @click="modalBlacklistJwt = true"
        >
          Blacklister
        </button>
        <button
          v-if="!jwt.archived && isAdmin"
          class="button secondary"
          @click="modalArchiveJwt = true"
        >
          Archiver
        </button>
      </div>
    </div>
    <modal
      v-if="modalBlacklistJwt"
      @submit="blacklistJwt"
      @close="modalBlacklistJwt = false"
    >
      <p slot="modalText">
        Êtes-vous sûr de vouloir blacklister ce token ?
      </p>
      <template slot="confirmText">
        Blacklister
      </template>
    </modal>
    <modal
      v-if="modalArchiveJwt"
      @submit="archiveJwt"
      @close="modalArchiveJwt = false"
    >
      <p slot="modalText">
        Êtes-vous sûr de vouloir archiver ce token ?
      </p>
      <template slot="confirmText">
        Archiver
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "@/components/ui/Modal";

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
      modalBlacklistJwt: false,
      modalArchiveJwt: false
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
        .dispatch("user/blacklistToken", this.jwt.payload.jti)
        .finally((this.modalBlacklistJwt = false));
    },

    archiveJwt() {
      this.$store
        .dispatch("user/archiveToken", this.jwt.payload.jti)
        .finally((this.modalArchiveJwt = false));
    }
  },

  components: {
    modal: Modal
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

.blacklisted_token,
.blacklisted_token input,
.blacklisted_token label {
  color: #c9d3df;
}
</style>
