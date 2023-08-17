module.exports = {
  name: 'note',
  port: 3017,
  scope: 'note',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3017/remoteEntry.js',
    scope: 'note',
    module: './routes'
  },
  menus:[{"text":"Notes","url":"/notes","icon":"icon-star","location":"mainNavigation"}]
};
