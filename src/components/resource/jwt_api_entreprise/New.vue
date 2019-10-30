<template lang="pug">
.dialog
  button.button.small.title-button(@click="showDialog") Ajouter un token
  .dialog-backdrop(v-if="dialog")
    .dialog__full
      .dialog__jwt_data
        .dialog.panel
          h2 Ajout d’un nouveau token
          .form__group
            label(for="agent-name") Organisme utilisateur final (ex: numéro SIRET)
            input(type="text" v-model="subject" id="agent-name")

          .form__group
            label Rôles d’accès
            div(v-for="role in allRoles")
              input(type="checkbox" :id="role.code" v-model="checked_roles" :value="role.code")
              label.label-inline(:for="role.code") {{role.name}}
      .dialog__contacts.panel
        .form__group
          h4 Contact administratif
          label(for="admin-email") Adresse Email
          input(type="text" id="admin-email" v-model="admin_contact.email")

          label(for="admin-phone") Numéro de téléphone
          input(type="text" id="admin-phone" v-model="admin_contact.phone_number")

        .form__group
          h4 Contact technique
          label(for="tech-email") Adresse Email
          input(type="text" id="tech-email" v-model="tech_contact.email")

          label(for="tech-phone") Numéro de téléphone
          input(type="text" id="tech-phone" v-model="tech_contact.phone_number")

        .action-buttons
          button.button.small(@click="submit") Créer
          button.button.small.warning(@click="reset") Annuler

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "JwtApiEntrepriseNew",
  data() {
    return {
      dialog: false,
      subject: "",
      checked_roles: [],
      admin_contact: {
        email: "",
        phone_number: "",
        contact_type: "admin"
      },
      tech_contact: {
        email: "",
        phone_number: "",
        contact_type: "tech"
      }
    };
  },

  computed: {
    ...mapGetters({
      allRoles: "role/index"
    })
  },

  methods: {
    submit: function() {
      const formatedRolesList = this.checked_roles.map(function(codeValue) {
        return { code: codeValue };
      });

      const payload = {
        roles: formatedRolesList,
        subject: this.subject,
        contacts: [this.admin_contact, this.tech_contact]
      };

      this.$store
        .dispatch("user/createToken", payload)
        .then(() => this.reset())
        .catch(() => {
          // TODO something went wrong
        });
    },

    reset: function() {
      this.checked_roles = [];
      this.admin_contact.email = this.admin_contact.phone_number = "";
      this.tech_contact.email = this.tech_contact.phone_number = "";
      this.dialog = false;
      this.subject = "";
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

.dialog__full {
  display: grid;
  grid-template-columns: 50% 50%;
}

.dialog__jwt_data {
  grid-column-start: 1;
  grid-column-end: 2;
}

.dialog__contacts {
  display: flex;
  justify-content: center;
  flex-direction: column;
  grid-column-start: 2;
  grid-column-end: 3;
}

.dialog {
  display: inline-block;
}

h2 {
  margin-top: 0;
}

.action-buttons {
  margin-top: 2em;
}
</style>
