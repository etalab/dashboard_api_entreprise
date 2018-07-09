<template lang="pug">
  .container
    h2 Incidents survenus sur la plateforme API Entreprise

    incident-new(v-if="isAdmin")

    template(v-for="incident in index")
      .panel
        .panel__header
          h3 {{ incident.title }}
          small.panel__header-extra {{ incident.subtitle }}
          incident-update(:id="incident.id" :title="incident.title" :subtitle="incident.subtitle" :description="incident.description" v-if="isAdmin")
        div(v-html="toHtml(incident.description)")
</template>

<script>
import { mapGetters } from 'vuex'
import IncidentNew from '@/components/resource/incident/New.vue'
import IncidentUpdate from '@/components/resource/incident/Update.vue'
import marked from 'marked'

export default {
  name: 'incidents-index',

  created: function () {
    this.$store.dispatch('incident/index')
  },

  computed: {
    ...mapGetters({
      index: 'incident/index',
      isAdmin: 'auth/isAdmin'
    })
  },

  methods: {
    toHtml (markdownText) {
      return marked(markdownText)
    }
  },

  components: {
    'incident-new': IncidentNew,
    'incident-update': IncidentUpdate
  }
}
</script>
