module.exports = {
  apps: [
    {
      name: "bulning-production",
      script: "./dist/src/index.js",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production',
      }
    },
    {
      name: "bulning-development",
      script: "./dist/src/index.js",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    }
  ],
};
