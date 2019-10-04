<template lang="pug">
  #app
    icon-definition
    navigation-header
    router-view
</template>

<script>
import IconDefinition from "@/components/ui/IconDefinition";
import NavigationHeader from "@/components/ui/NavigationHeader";

export default {
  name: "App",
  components: {
    IconDefinition: IconDefinition,
    "navigation-header": NavigationHeader
  }
};
</script>
