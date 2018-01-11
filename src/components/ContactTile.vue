<template lang="pug">
  v-card
    v-card-title(primary-title class="headline pb-0") {{ contactLabel }}
    v-card-text
      div
        v-icon.mr-2 email
        span {{ contact.email }}

      div
        v-icon.mr-2 phone
        span {{ contact.phone_number }}
    v-card-actions
      v-btn(flat color="primary") Editer
      v-btn(flat color="error") Supprimer
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
