<template>
  <div>
    <button class="button primary" @click="modalMagicLink = true">
      Partager
    </button>

    <modal
      v-if="modalMagicLink"
      :api-errors="apiErrors"
      @submit="generateMagicLink"
      @close="modalMagicLink = false"
    >
      <p slot="modalText">
        Adresse à laquelle envoyer le jeton par email
      </p>

      <input slot="modalForm" v-model="email" type="text" />

      <template slot="confirmText">
        Envoyer
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/ui/Modal";

export default {
  name: "MagicLinkNew",

  props: {
    jwtId: {
      type: String,
      default() {
        return "";
      }
    }
  },

  data() {
    return {
      modalMagicLink: false,
      email: "",
      apiErrors: {}
    };
  },

  methods: {
    generateMagicLink: function() {
      const payload = {
        id: this.jwtId,
        email: this.email
      };
      this.$store
        .dispatch("jwt_api_entreprise/createMagicLink", payload)
        .then(() => this.reset())
        .catch(errors => (this.apiErrors = errors));
    },

    reset: function() {
      this.email = "";
      this.modalMagicLink = false;
    }
  },

  components: {
    modal: Modal
  }
};
</script>

<style lang="scss" scoped></style>
