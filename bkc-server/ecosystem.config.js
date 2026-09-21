module.exports = {
  apps: [{
    name: "bkc-server",
    script: "npx",
    args: "tsx src/server.ts",
    watch: false,
    autorestart: true,
    max_memory_restart: "1G",
    restart_delay: 5000,
    max_restarts: 10,
    env: {
      NODE_ENV: "development",
    }
  }]
};
