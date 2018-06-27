<template lang="pug">
  .container
    h2 Incidents survenus sur la plateforme API Entreprise

    template(v-for="incident in index")
      .panel
        .panel__header
          h3 {{ incident.title }}
          small.panel__header-extra {{ incident.subtitle }}

        div {{ incident.description }}
      .br
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('incident')

export default {
  name: 'incidents-index',

  created: function () {
    this.$store.dispatch('incident/index')
  },

  computed: {
    ...mapGetters(['index'])
  }
}
</script>
