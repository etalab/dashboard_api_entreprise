<template>
  <tr :class="statusClass">
    <td>
      <div class="ui ribbon label" :class="colorClass">{{ name }}</div>
    </td>
    <td>{{ status }}</td>
    <td>{{ timestampMoment(timestamp) }}</td>
  </tr>
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
      colorClass: '',
      statusClass: ''
    }
  },
  created: function () {
    switch (this.code) {
      case 200:
        this.status = 'UP'
        this.colorClass = 'green'
        this.statusClass = 'positive'
        break
      case 206:
        this.status = 'INCOMPLETE'
        this.colorClass = 'orange'
        this.statusClass = 'warning'
        break
      default:
        this.status = 'DOWN'
        this.colorClass = 'red'
        this.statusClass = 'negative'
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
