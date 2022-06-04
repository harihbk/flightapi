// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [{
    name: 'api',
    script: 'src/index.js',
    env: {
      NODE_ENV: 'development',
      NODE_APP_INSTANCE: 0,
      serverMode: 'api'
    }
  }
  ]
}
