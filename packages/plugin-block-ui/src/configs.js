module.exports = {
  name: 'block',
  port: 3017,
  scope: 'block',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3017/remoteEntry.js',
    scope: 'block',
    module: './routes'
  },
  menus:[{"text":"Blocks","url":"/blocks","icon":"icon-star","location":"mainNavigation"}]
};
