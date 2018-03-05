<template lang="pug">
  #app
    icon-definition
    router-view
</template>

<script>
import IconDefinition from '@/components/ui/IconDefinition'

export default {
  name: 'app',
  components: {
    'IconDefinition': IconDefinition
  }
}
</script>
