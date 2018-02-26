<template lang="pug">
  #app
    icon-definition
    navbar
    router-view
</template>

<script>
import IconDefinition from '@/components/layout/IconDefinition'
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'app',
  components: {
    'IconDefinition': IconDefinition,
    'Navbar': Navbar
  }
}
</script>
