# Dashboard API Entreprise

Ce projet est déprécié. Le dashboard fait maintenant partie intégrante du projet [Admin API Entreprise](https://github.com/etalab/admin_api_entreprise).

## Environnements de développement

Le projet est développé dans un environnement Node.js version 11.10.0. Voir NVM comme gestionnaire de versions Node.

L'utilisation de Vue CLI est nécessaire au fonctionnement de l'environnement de
développement : `npm install -g @vue/cli`.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for sandbox with minification
npm run build:sandbox

# build for production with minification
npm run build:production
```

For a detailed explanation on how things work, check out the [guide](https://cli.vuejs.org/guide/) and [docs for vue-loader](https://vue-loader.vuejs.org/guide/).

## Deployment

Deployment is handled by the `mina` package. Please install this with `bundle install`.

```
bundle exec mina deploy to=production domain=dashboard.entreprise.api.gouv.fr
```
