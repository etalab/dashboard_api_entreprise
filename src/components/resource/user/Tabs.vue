<template lang="pug">
  ul.profile__tabs
    li
      router-link(:to="{ name:'userProfileShow' }") Profil
    li
      router-link(:to="{ name:'userTokensShow' }") Tokens
    li
      router-link(:to="{ name:'userContactsShow' }") Contacts
</template>

<script>
export default {
  name: 'user-tabs'
}
</script>

<style lang="scss" scoped>
  .profile__tabs {
    margin: 0;
    margin-bottom: 3em;
    padding: 0;
  }

  .profile__tabs li {
    display: inline;
  }

  .profile__tabs li + li {
    margin-left: 1em;
  }

  .profile__tabs a {
    display: inline-block;
    background: $color-white;
    border-radius: 3px;
    box-shadow: 0 0 4px $color-light-grey;
    padding: .75em 1.5em;
  }

  .profile__tabs .router-link-active {
    background: $color-blue;
    color: $color-white;
  }
</style>
