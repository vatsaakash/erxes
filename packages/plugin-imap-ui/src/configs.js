module.exports = {
  name: "imap",
  scope: 'imap',
  port: 3014,
  exposes: {
    './routes': './src/routes.tsx',
    "./inboxIntegrationSettings": "./src/components/IntegrationSettings.tsx",
  },
  routes: {
    url: 'http://localhost:3014/remoteEntry.js',
    scope: 'imap',
    module: './routes'
  },
  inboxIntegrationSettings: './inboxIntegrationSettings',
};