# Admin Board API Entreprise

## Environnements de développement

Le projet est développé dans un environnement Node.js version 8.6.0. Voir NVM comme gestionnaire de versions Node.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for sandbox with minification
npm run sandbox

# build for production with minification
npm run build
# or
npm run production

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

Deployment is handled by the `dploy` package. Please install this NPM package
globaly : `npm install dploy -g`.

Explicit configuration can be found in the dploy.yaml file located into the
project root folder.

Use `dploy sandbox` or `dploy production` in order to deploy to the corresponding environment.
