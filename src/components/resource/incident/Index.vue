<template lang="pug">
  .container
    h2 Incidents survenus sur la plateforme API Entreprise

    incident-new

    template(v-for="incident in index")
      .panel
        .panel__header
          h3 {{ incident.title }}
          small.panel__header-extra {{ incident.subtitle }}

        div {{ incident.description }}
      .br
</template>

<script>
import { mapGetters } from 'vuex'
import IncidentNew from '@/components/resource/incident/New.vue'

export default {
  name: 'incidents-index',

  created: function () {
    this.$store.dispatch('incident/index')
  },

  computed: {
    ...mapGetters({
      index: 'incident/index'
    })
  },

  components: {
    'incident-new': IncidentNew
  }
}
</script>
