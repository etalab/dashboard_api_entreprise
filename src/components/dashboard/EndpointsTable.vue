<template>
  <div>
    <div class="ui top attached tabular menu">
      <a class="item active" data-tab="v2">v2</a>
      <a class="item" data-tab="v1">v1</a>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="v2">
      <slot name="info-v2"></slot>
      <table class="ui celled table">
        <thead>
        <tr>
          <th>Endpoint</th>
          <th>Status</th>
          <th>Dernier appel</th>
        </tr>
        </thead>
        <tbody>
        <slot name="v2"></slot>
        </tbody>
      </table>
    </div>
    <div class="ui bottom attached tab segment" data-tab="v1">
      <slot name="info-v1"></slot>
      <table class="ui celled table">
        <thead>
        <tr>
          <th>Endpoint</th>
          <th>Status</th>
          <th>Dernier appel</th>
        </tr>
        </thead>
        <tbody>
        <slot name="v1"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'endpoints-table'
}
</script>
