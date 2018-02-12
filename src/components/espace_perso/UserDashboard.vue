<template>
  <div class="dashboard">
    <navbar></navbar>
    <div class="container">
      <h1>Liste des tokens existants</h1>
      <ul class="token__list">
        <li class="panel">
          <div class="panel__header">
            <h3 class="token__name">Token</h3>
            <small class="panel__header-extra">Créé le 3 janvier 2018</small>
            <a href="/" class="button-stats">Voir les statistiques →</a>
          </div>
          <div class="form__group token__rights">
            <label class="token__rights-label">Droits associés</label>
            <ul class="token__rights-list tag-list">
              <li class="tag"><a>Entreprises</a></li>
              <li class="tag"><a>Etablissements</a></li>
              <li class="tag"><a>Liasse fiscale</a></li>
            </ul>
          </div>
          <div class="form__group token__string">
            <label for="token">Token</label>
            <div class="input__group">
              <input type="text" name="token" />
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
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import { mapGetters } from 'vuex'

export default {
  name: 'user-dashboard',

  computed: {
    ...mapGetters([
      'userId',
      'userEmail',
      'userContext',
      'userContacts',
      'userTokens'
    ])
  },

  components: {
    'Navbar': Navbar
  }
}
</script>

<style lang="scss" scoped>
  .container {
    top: 7em;
  }

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
</style>
