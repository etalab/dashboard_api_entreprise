<template>
  <div>
    <button class="button primary" @click="modalMagicLink = true">
      Transmettre le jeton à mon équipe technique
    </button>

    <modal
      v-if="modalMagicLink"
      :api-errors="apiErrors"
      @submit="generateMagicLink"
      @close="modalMagicLink = false"
    >
      <p slot="modalText">
        Adresse e-mail à laquelle un lien d'accès au token, d'une durée de 4
        heures, sera envoyé.
      </p>

      <div slot="modalForm">
        <input slot="modalForm" v-model="email" type="text" />
        <p>
          ⚠️ Votre clé d'accès est unique et privée. L'utilisation de cette
          fonctionnalité doit avoir pour unique objectif la transmission
          sécurisée de votre clé à vos services techniques qui intégreront l'API
          Entreprise.
        </p>
        <p>
          Le renouvellement d’un token est très facile et rapide. C’est
          pourquoi, si vous avez divulgué votre token par erreur, n’hésitez pas
          à écrire rapidement à support@entreprise.api.gouv.fr.
        </p>
      </div>

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
