<template lang="pug">
  div
    tabs
      tab(name="v2")
        slot(name="info-v2")
        table
          thead
            tr
              th Endpoint
              th Status
              th Dernier appel

          tbody
            slot(name="v2")

      tab(name="v1")
        slot(name="info-v1")
        table
          thead
            tr
              th Endpoint
              th Status
              th Dernier appel

          tbody
            slot(name="v1")

</template>

<script>
import {Tabs, Tab} from 'vue-tabs-component'

export default {
  name: 'endpoints-table',
  components: {
    'tabs': Tabs,
    'tab': Tab
  }
}
</script>

<style lang="scss">
  thead {
    background-color: $color-lighter-grey;
  }
</style>
