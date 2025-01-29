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
      script: "npm run dev:test-server",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'test-server'
      }
    }
  ],
};
