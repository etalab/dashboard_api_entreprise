<template lang="pug">
.dialog
  button.button.small.title-button(@click.prevent="showDialog") Déléguer le compte utilisateur
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Changement de propriétaire du compte
      div(class="notification error" v-if="errorsArePresent")
        ul
          li(v-for="(errorMsg, fieldKey) in apiErrors" :key="fieldKey") {{ fieldKey }} : {{ errorMsg }}
      p Vous vous apprêtez à déléguer votre compte utilisateur à quelqu'un d'autre. Cette action est irréversible, tous vos jetons seront transférés à l'utilisateur cible et ils n'apparaitront plus dans votre profil ! Un email notifiera le propriétaire du transfert.
      p Si vous souhaitez réaliser cette action, renseignez simplement l'adresse email de l'utilisateur à qui vous souhaitez donner le contrôle de vos jetons.

      .form__group
        label(for="new-owner-email") Email du nouveau propriétaire
        input(type="text" v-model="newOwnerEmail" id="new-owner-email")

      .action-buttons
        button.button.small(@click.prevent="submit") Valider
        button.button.small.warning(@click.prevent="reset") Annuler
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserTransferAccount",

  data() {
    return {
      dialog: false,
      newOwnerEmail: "",
      apiErrors: {}
    };
  },

  computed: {
    ...mapGetters({
      userDetails: "user/userDetails"
    }),

    errorsArePresent: function() {
      return Object.keys(this.apiErrors).length > 0;
    }
  },

  methods: {
    submit: function() {
      const payload = {
        id: this.userDetails.id,
        new_owner_email: this.newOwnerEmail
      };

      this.$store
        .dispatch("user/transferAccount", payload)
        .then(() => this.reset())
        .catch(errors => (this.apiErrors = errors));
    },

    reset: function() {
      this.newOwnerEmail = "";
      this.dialog = false;
    },

    showDialog: function() {
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
label.label-inline {
  color: $color-black;
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
  max-width: 65%;
}

h2 {
  margin-top: 0;
}

.action-buttons {
  margin-top: 2em;
}
</style>
