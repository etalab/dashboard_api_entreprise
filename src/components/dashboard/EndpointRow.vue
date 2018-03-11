<template lang="pug">
  tr(:class="statusClass")
    td
      .ui.ribbon.label {{ name }}
    td {{ status }}
    td {{ timestampMoment(timestamp) }}
</template>

<script>
import moment from 'moment'
import '@/assets/moment-fr.js'

export default {
  name: 'endpoint',
  props: ['name', 'code', 'timestamp'],
  data () {
    return {
      status: '',
      statusClass: ''
    }
  },
  created: function () {
    switch (this.code) {
      case 200:
        this.status = 'UP'
        this.statusClass = 'success'
        break
      case 206:
        this.status = 'INCOMPLETE'
        this.statusClass = 'warning'
        break
      default:
        this.status = 'DOWN'
        this.statusClass = 'error'
        break
    }
  },
  methods: {
    timestampMoment: function (timestamp) {
      return moment(timestamp).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
  tr {
    outline-style: auto;
    outline-color: $color-light-grey;
  }
  .success {
    background-color: $color-light-green;
    color: $color-green;
    border-color: #color-green;
  }
  .error {
    background-color: $color-light-red;
    color: $color-red;
    border-color: #color-red;
  }
  .warning {
    background-color: $color-light-orange;
    color: $color-orange;
    border-color: #color-orange;
  }
</style>
