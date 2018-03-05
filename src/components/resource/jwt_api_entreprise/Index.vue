<template>
  <ul class="token__list">
    <li class="panel" v-for="(token, index) in jwtList" :key="index">
      <div class="panel__header">
        <h3 class="token__name">Token {{ index + 1}}</h3>
        <small class="panel__header-extra">Créé le 3 janvier 2018</small>
        <a href="#" class="button-stats">Voir les statistiques →</a>
      </div>
      <div class="form__group token__rights">
        <label class="token__rights-label">Accès</label>
        <ul class="token__rights-list tag-list">
          <li class="tag" v-for="(role, index) in token.payload.roles" :key="index">{{ role }}</li>
        </ul>
      </div>
      <div class="form__group token__string">
        <label for="token">Token</label>
        <div class="input__group">
          <input type="text" name="token" :value="token.value"/>
          <button class="button icon-button">
            <svg class="icon icon-copy" viewBox="0 0 32 32"><use xlink:href="#icon-copy"></use></svg>
          </button>
        </div>
      </div>
      <!--div class="form__group button-stats">
        <a class="button" href="#">Statistiques</a>
      </div-->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'jwt-api-entreprise-index',

  props: ['jwtList']
}
</script>

<style lang="scss" scoped>
  .token__list {
    padding: 0;
    list-style-type: none;
  }

  .token__row {
    display: flex;
    flex-direction: row;
    align-items: end;
  }

  .token__row .form__group {
    flex: 1;
    margin-bottom: 0;
  }

  .button-stats {
    float: right;
  }

  .panel {
    margin-bottom: 1em;
  }

  .tag {
    margin-bottom: 0.5em;
  }
</style>
