<template lang="pug">
  .content
    navigation-header
    router-view
</template>

<script>
import NavigationHeader from '@/components/ui/NavigationHeader'

export default {
  name: 'dashboard',
  components: {
    'navigation-header': NavigationHeader
  }
}
</script>
