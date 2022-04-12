module.exports = {
  apps: [{
    name: 'API',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      PORT: 4000,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 80,
      NODE_ENV: 'production'
    }
  }],
};