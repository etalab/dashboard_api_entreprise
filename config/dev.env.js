'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"http://localhost:3000"',
  DASHBOARD_URL_PREFIX: '"/api/watchdoge/dashboard"'
})
