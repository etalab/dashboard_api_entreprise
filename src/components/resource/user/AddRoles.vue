<template lang="pug">
.dialog
  button.button.small.title-button(@click="showDialog") Ajouter un droit
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Donner des droits à l'utilisateur

      .form__group
        div(v-for="role in index")
          input(type="checkbox" :id="role.id" v-model="checked_roles" :value="role.id")
          label.label-inline(:for="role.id") {{ role.name }}

      .action-buttons
        button.button.small(@click="submit") Créer
        button.button.small.warning(@click="reset") Annuler

</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("role");

export default {
  name: "UserAddRolesForm",

  data() {
    return {
      dialog: false,
      checked_roles: []
    };
  },

  computed: {
    ...mapGetters(["index"])
  },

  methods: {
    submit: function() {
      this.$store
        .dispatch("user/addRoles", { roles: this.checked_roles })
        .then(() => this.reset())
        .catch(e => {
          // TODO something went wrong
        });
    },

    reset: function() {
      this.checked_roles = [];
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

h2 {
  margin-top: 0;
}

.action-buttons {
  margin-top: 2em;
}
</style>
