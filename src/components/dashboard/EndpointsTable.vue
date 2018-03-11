<template lang="pug">
  .panel
    .ui.top.attached.tabular.menu
      a.item.active(data-tab="v2") v2
      a.item(data-tab="v1") v1

    .ui.bottom.attached.tab.segment.active(data-tab="v2")
      slot(name="info-v2")
      table.ui.celled.table
        thead
          tr
            th Endpoint
            th Status
            th Dernier appel

        tbody
        slot(name="v2")

    .ui.bottom.attached.tab.segment(data-tab="v1")
      slot(name="info-v1")
      table.ui.celled.table
        thead
          tr
            th Endpoint
            th Status
            th Dernier appel

        tbody
        slot(name="v1")
</template>

<script>
export default {
  name: 'endpoints-table'
}
</script>

<style lang="scss">
  thead {
    background-color: $color-lighter-grey;
  }
</style>
