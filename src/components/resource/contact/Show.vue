<template lang="pug">
  .panel
    h4 {{ contactLabel }}
    .contact-item
      .label Email
      span {{ contact.email }}

    .contact-item
      .label Téléphone
      span {{ contact.phone_number }}

    .action-buttons
      button.button.small Editer
      button.button.small.warning Supprimer
</template>

<script>
export default {
  name: 'contact-tile',
  props: ['contact'],

  computed: {
    contactLabel () {
      switch (this.contact.contact_type) {
        case 'admin':
          return 'Contact administratif'
        case 'tech':
          return 'Contact technique'
        case 'other':
          return 'Autre contact'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h4 {
    margin-top: 0;
  }

  .contact-item {
    margin-bottom: 1em;
  }

  .label {
    color: $color-dark-grey;
  }
</style>
