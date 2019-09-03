<template lang="pug">
.dialog
  button.button(@click="showDialog") Nouvel incident
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Ajouter un nouvel incident
      .form__group
        label(for="title") Titre
        input(type="text" v-model="title" id="title")

      .form__group
        label(for="subtitle") Période
        input(type="text" v-model="subtitle" id="subtitle")

      .form__group
        label(for="description") Description de l'incident
        textarea(rows="8" cols="80" v-model="description" id="description")

      .action-buttons
        button.button.small(@click="submit") Valider
        button.button.small.warning(@click="reset") Annuler

</template>

<script>
export default {
  name: "IncidentNew",

  data() {
    return {
      dialog: false,
      title: "",
      subtitle: "",
      description: ""
    };
  },

  methods: {
    submit() {
      let payload = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description
      };

      this.$store
        .dispatch("incident/create", payload)
        .then(() => this.reset())
        .catch(e => {
          // TODO display forms server validation errors
        });
    },

    showDialog() {
      this.dialog = true;
    },

    reset() {
      this.dialog = false;
      this.title = "";
      this.subtitle = "";
      this.description = "";
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
  max-width: 32em;
  margin-bottom: 1em;
}

h2 {
  margin-top: 0;
}

.action-buttons {
  margin-top: 2em;
}
</style>
