<template lang="pug">
  .panel
    .panel__header
      h4 {{ contactLabel }}
    .contact-item
      dl
        dt Email
        dd {{ contact.email }}

    .contact-item
      dl
        dt Téléphone
        dd {{ contact.phone_number }}

    .action-buttons
      button.button.small Editer
      button.button.small.warning Supprimer
</template>

<script>
export default {
  name: "ContactTile",

  props: {
    contact: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    contactLabel() {
      switch (this.contact.contact_type) {
        case "admin":
          return "Contact administratif";
        case "tech":
          return "Contact technique";
        case "other":
          return "Autre contact";
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
}

h4 {
  margin-top: 0;
  margin-bottom: 1em;
}

.contact-item {
  margin-bottom: 1em;
}

.label {
  color: $color-dark-grey;
}
</style>
