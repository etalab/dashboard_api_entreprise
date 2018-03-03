<template lang="pug">
  #app
    icon-definition
    router-view
</template>

<script>
import IconDefinition from '@/components/layout/IconDefinition'

export default {
  name: 'app',
  components: {
    'IconDefinition': IconDefinition
  }
}
</script>
