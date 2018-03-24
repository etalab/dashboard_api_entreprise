<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 {{ tableTitle }}
      //ul(v-if="timeSpans")
        li.stats__time-span(v-for="time in timeSpans" v-on:click="changeSpan(time.value)") {{ time.label }}
  table
    thead
      th(v-for="header in headers") {{ header }}
    tbody
      tr(v-for="item in lastCalls")
        td {{ item.url }}
        td {{ item.params }}
        td(class="return-code") {{ item.code }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'statsTable',

  data () {
    return {
      tableTitle: 'Derniers appels',
      headers: ['Endpoint', 'Paramètres', 'Code retour']
    }
  },

  computed: {
    ...mapGetters('stats', [
      'lastCalls'
    ])
  }
}
</script>

<style lang="scss">
  .return-code {
    width: 90px;
  }
</style>
