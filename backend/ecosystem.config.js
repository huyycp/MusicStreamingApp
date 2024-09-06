const path = require('path')

module.exports = {
  apps: [
    {
      name: 'twitter',
      script: path.resolve('dist', 'index.js'),
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
