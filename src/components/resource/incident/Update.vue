<template lang="pug">
.dialog
  button(class="button small secondary" @click="showDialog") Editer
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Mise à jour de l'incident
      .form__group
        label(for="title") Titre
        input(type="text" v-model="titleField" id="title")

      .form__group
        label(for="subtitle") Période
        input(type="text" v-model="subtitleField" id="subtitle")

      .form__group
        label(for="description") Description de l'incident
        textarea(rows="8" cols="80" v-model="descriptionField" id="description")

      .action-buttons
        button.button.small(@click="submit") Valider
        button.button.small.warning(@click="reset") Annuler

</template>

<script>
export default {
  name: 'incident-update',

  props: ['id', 'title', 'subtitle', 'description'],

  data () {
    return {
      dialog: false,
      titleField: this.title,
      subtitleField: this.subtitle,
      descriptionField: this.description
    }
  },

  methods: {
    submit () {
      let payload = {
        title: this.titleField,
        subtitle: this.subtitleField,
        description: this.descriptionField
      }

      this.$store.dispatch('incident/update', { params: payload, incidentId: this.id })
        .then(() => this.reset())
        .catch(e => {
          // TODO display forms server validation errors
        })
    },

    showDialog () {
      this.dialog = true
    },

    reset () {
      this.dialog = false
      this.titleField = this.title
      this.subtitleField = this.subtitle
      this.description = this.description
    }
  }
}
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
